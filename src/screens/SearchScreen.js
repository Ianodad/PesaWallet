import React, {useState, useEffect} from 'react';
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
import {SearchBar} from '@rneui/themed';
import Screen from '../components/Screen';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
import {messageActions} from '../_actions';

import {AppForm, AppFormField, SubmitButton} from '../components/Forms';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useFormikContext} from 'formik';

import color from '../config/colors';
import TransactionList from '../components/TransactionList';

const {
  getCollection,
  storeMessages,
  removeFromStorage,
  selectProvideType,
  aggregatorMessageData,
} = messageActions;

const SearchScreen = ({
  navigation,
  userDetails,
  aggregatoredData,
  balances,
  phoneNumber,
}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const loadCollection = async () => {
    try {
      const collection = await AsyncStorage.getItem('PROCESSED_COLLECTIONS');
      const data = await JSON.parse(collection);
      console.log('data', data['MPESA']);
      setFilteredDataSource(data['MPESA']);
      setMasterDataSource(data['MPESA']);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadCollection();
  }, []);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.NAME ? item.NAME.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  return (
    <Screen navigation={navigation} style={styles.screen} menu Gradient>
      {/* <ActivityIndicator visible={this.state.loading} /> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar
            round
            searchIcon={{size: 24}}
            onChangeText={text => searchFilterFunction(text)}
            onClear={text => searchFilterFunction('')}
            placeholder="Type Here..."
            value={search}
          />
        </View>
        <View swapShadows inner style={styles.sources}>
          <TransactionList
            header
            flatList={true}
            navigation={navigation}
            title={'Results'}
            data={filteredDataSource}
          />
        </View>
      </View>
    </Screen>
  );
};
const mapStateToProps = state => {
  // console.log(state)
  const {SmsCollected, authState} = state;
  return {
    collection: SmsCollected.collection,
    balances: SmsCollected.balances,
    userDetails: authState.userDetails,
    phoneNumber: authState.userPhoneNumber,
    aggregatoredData: SmsCollected.aggregatedMessageData,
  };
};

const mapDispatchToProps = {
  getCollection,
  aggregatorMessageData,
  selectProvideType,
};

// gradinetColors={['#5a60f8', '#5a60f8', '#8387f9']}
// gradinetColors={['#39b54b', '#39b54b', '#65cd73']}
// gradinetColors={['#ff5251', '#ff5252', '#ff7d7d']}
// gradinetColors={['#fed304', '#fed304', '#fedd42']}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

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
