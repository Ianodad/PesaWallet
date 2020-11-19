import React, {Component} from 'react';
import Screen from '../components/Screen';
import SourceDetails from './SourceDetailsScreen';
import Card from '../components/Card';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
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
import {sources} from "../services/sources"



export class home extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Screen navigation={navigation} style={styles.screen} menu>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TitleHeader style={styles.title} home={'home'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(home);

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
    backgroundColor: color.primary,
    // paddingTop:30,
    paddingHorizontal: 16,
    flex: 1.5,
    //  position: "relative",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
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
    // borderRadiu    paddingTop: 15,
  },
});
