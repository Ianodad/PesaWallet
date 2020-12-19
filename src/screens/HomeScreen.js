import React, {Component} from 'react';
import Screen from '../components/Screen';
// import SourceDetailsScreen from './SourceDetailsScreen';
import Card from '../components/Card';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {NumberCommas} from '../_helpers/NumberCommas';
import ReadMessages from '../_helpers/ReadMessages';
import {storeMessages} from '../_actions';
import color from '../config/colors';
import TitleHeader from '../components/TitleHeader';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {sources} from '../services/sources';
import defaultStyles from '../config/styles';
import commentsApi from '../api/comments';

import ActivityIndicator from '../components/ActivityIndicator';
import AsyncStorage from '@react-native-community/async-storage';

import {firestore, firebase} from '../firebase/config';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.getUser();
    this.state = {
      username: '',
      comments: [],
      loading: false,
      error: '',
      screenHeight: null,
      screenWidth: null,
    };
  }
  onLayout = (e) => {
    console.log('Screen oriantion changed....');
    this.setState({
      screenWidth: Dimensions.get('window').width,
      screenHeight: Dimensions.get('window').height,
    });
  };

  getUser = async () => {
    const userDocument = await firestore()
      .collection('users')
      .doc('pNwlt65zlQPwFfeg7Tc8')
      .get();
    // console.log(userDocument.data.name);
  };

  componentDidMount = () => {
    this.loadComments();
    this.retrieveUser();
  };

  retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem('USER');
      if (value !== null) {
        // We have data!!
        // console.log('this here');
        const userInfo = JSON.parse(value);
        // console.log(userInfo.email)
        this.setState({username: userInfo.email});

        // console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  loadComments = async () => {
    this.setState({loading: true});

    const {data, ok} = await commentsApi.getComments();

    if (!ok) {
      return this.setState({error: true});
    }
    // console.log(JSON.stringify(data), '/t')
    this.setState({comments: data});
    this.setState({error: false});
  };
  render() {
    const {navigation} = this.props;
    return (
      <Screen navigation={navigation} style={styles.screen} menu Gradient>
        {/* <ActivityIndicator visible={this.state.loading} /> */}
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TitleHeader
                style={styles.title}
                home={'home'}
                title={this.state.username}
              />
            </View>
          </View>
          <View swapShadows inner style={styles.sources}>
            <FlatList
              data={sources}
              keyExtractor={(source) => source.id.toString()}
              renderItem={({item}) => (
                <Card
                  style={styles.card}
                  gradient
                  gradientColors={item.color}
                  title={item.title}
                  balance={'Ksh' + NumberCommas(item.balance)}
                  logo={item.logo}
                  onPress={() => navigation.navigate('SourceDetails', item)}
                />
              )}
            />
          </View>
        </View>
      </Screen>
    );
  }
}
const mapStateToProps = (state) => {
  const {SmsCollected} = state;
  return {
    collection: SmsCollected.collection,
  };
};
const mapDispatchToProps = {storeMessages};

// gradinetColors={['#5a60f8', '#5a60f8', '#8387f9']}
// gradinetColors={['#39b54b', '#39b54b', '#65cd73']}
// gradinetColors={['#ff5251', '#ff5252', '#ff7d7d']}
// gradinetColors={['#fed304', '#fed304', '#fedd42']}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: color.primary,
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
  header: {
    // backgroundColor: color.primary,
    // paddingTop:30,
    paddingHorizontal: 16,
    flex: 1.5,
    //  position: "relative",
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
    overflow: 'scroll',
    // height:110
  },
  // headerLeft: {
  //   paddingTop: 50,

  // },
  // title: {
  //   paddingHorizontal: 10,
  //   flexDirection: 'row',
  //   // alignItems:'center',
  //   justifyContent: 'center',
  // },
  sources: {
    // marginTop: 10,
    backgroundColor: color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 15,
    flex: 6,
    overflow: 'visible',
    zIndex: 2,
    // borderRadiu    paddingTop: 15,
  },
});
