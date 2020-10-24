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
import ReadMessages from '../_helpers/ReadMessages';
import {storeMessages} from '../_actions';
import color from '../config/colors';
import TitleName from '../components/TitleName';

const sources = [
  {
    id: 1,
    title: 'Mpesa',
    balance: 11500,
    logo: require('../assets/source/logoone.png'),
  },
  {
    id: 2,
    title: 'Airtel',
    balance: 7500,
    logo: require('../assets/source/logotwo.png'),
  },
  {
    id: 3,
    title: 'Telkom',
    balance: 20500,
    logo: require('../assets/source/logothree.png'),
  },
  {
    id: 4,
    title: 'Bank',
    balance: 11500,
    logo: require('../assets/source/logofour.png'),
  },
  {
    id: 5,
    title: 'Airtel',
    balance: 7500,
    logo: require('../assets/source/logotwo.png'),
  },
  {
    id: 6,
    title: 'Telkom',
    balance: 20500,
    logo: require('../assets/source/logothree.png'),
  },
  {
    id: 7,
    title: 'Bank',
    balance: 11500,
    logo: require('../assets/source/logofour.png'),
  },
];
export class home extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TitleName style={styles.title} />
            </View>
          </View>
          <View style={styles.sources}>
            <FlatList
              data={sources}
              keyExtractor={(source) => source.id.toString()}
              renderItem={({item}) => (
                <Card
                  title={item.title}
                  balance={'Ksh' + item.balance}
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
  headerLeft: {
    paddingTop: 20,

    // flexDirection:"column",
    // justifyContent: 'center',
    // paddingHorizontal:15,
  },
  // title: {
  //   paddingHorizontal: 10,
  //   flexDirection: 'row',
  //   // alignItems:'center',
  //   justifyContent: 'center',
  // },
  sources: {
    backgroundColor: color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 15,
    flex: 6,
    overflow: 'visible',

    // borderRadius: 15,
  },
});
