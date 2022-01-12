import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
// import SourceDetailsScreen from './SourceDetailsScreen';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
import {storeMessages, getCollection, aggregatorMessageData} from '../_actions';
import {NumberCommas} from '../_helpers/NumberCommas';
import ReadMessages from '../_helpers/ReadMessages';
import commentsApi from '../api/comments';

import ActivityIndicator from '../components/ActivityIndicator';
import Card from '../components/Card';
import ProviderDetail from '../components/ProviderDetail';
import ProviderList from '../components/ProviderList';
import ProviderSlider from '../components/ProviderSlider';
import Screen from '../components/Screen';
import Text from '../components/Text';
import TitleHeader from '../components/TitleHeader';
// import ProviderCard from '../components/ProviderCard';
import color from '../config/colors';
import defaultStyles from '../config/styles';

import {firestore, firebase} from '../firebase/config';
import {sources} from '../services/sources';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.getUser();
    this.state = {
      username: '',
      collection: [],
      loading: false,
      error: '',
      screenHeight: null,
      screenWidth: null,
      sliderInfo: {},
    };
  }

  onLayout = e => {
    console.log('Screen orientation changed....');
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
    this.loadCollection();
    console.log(this.props.aggregatorMessageData);
    // this.retrieveUser();
  };

  loadCollection = async () => {
    try {
      const collection = await AsyncStorage.getItem('COLLECTION');
      if (collection !== null) {
        // We have data!!
        // console.log('this here');
        const data = JSON.parse(collection);

        // console.log(data)
        this.setState({collection: data});

        // console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  setSliderInfo = async item => {
    this.setState({sliderInfo: item});
  };
  // loadCollection = async () => {
  //   this.setState({loading: true});
  //   const collection = JSON.parse(this.props.collection)
  //   // const {data, ok} = await commentsApi.getComments();
  //   console.log(collection)

  //   if (!collection) {
  //     return this.setState({error: true});
  //   }
  //   // console.log(JSON.stringify(data), '/t')
  //   this.setState({collection});
  //   this.setState({error: false});
  // };

  render() {
    const {navigation, userDetails, aggregatoredData} = this.props;
    const {sliderInfo} = this.state;

    // console.log(aggregatoredData);
    return (
      <Screen navigation={navigation} style={styles.screen} menu Gradient>
        {/* <ActivityIndicator visible={this.state.loading} /> */}
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TitleHeader
                style={styles.title}
                home={'home'}
                title={userDetails?.givenName}
              />
            </View>
          </View>
          <View swapShadows inner style={styles.sources}>
            {/* <VendorCard /> */}
            {/* <ProviderList navigation={navigation} /> */}
            <View style={styles.sliderInfo}>
              <ProviderDetail
                AggregatoredData={aggregatoredData}
                Title={sliderInfo.title}
              />
              {/* <Text>{sliderInfo.title}</Text> */}
            </View>
            <View style={styles.slider}>
              <ProviderSlider
                navigation={navigation}
                onSliderInfo={this.setSliderInfo}
              />
            </View>
          </View>
        </View>
      </Screen>
    );
  }
}
const mapStateToProps = state => {
  // console.log(state)
  const {SmsCollected, authState} = state;
  return {
    collection: SmsCollected.collection,
    userDetails: authState.userDetails,
    aggregatoredData: SmsCollected.aggregatedMessageData,
  };
};

const mapDispatchToProps = {getCollection, aggregatorMessageData};

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
  slider: {
    flex: 1,
  },
  sliderInfo: {
    flex: 1.2,
    position: 'relative',
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
