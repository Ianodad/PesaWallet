import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';

import Text from './Text';
import Transaction from './Transaction';

import colors from '../config/colors';
import DateLineSeparator from '../components/DateLineSeparator';
import FlatListItem from './List/FlatListItem';
import SectionListItem from './List/SectionListIem';

const TransactionList = ({navigation, data, flatList, sectionList}) => {
  // console.log(messages)
  return (
    <View style={styles.container}>
      <View style={styles.transaction}>
        <Text style={styles.header}>Transaction</Text>
        {navigation && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FilteredDetailsScreen', data[0].item)
            }>
            <Text style={styles.SeeAll}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {flatList && (<FlatListItem data={data} navigation={navigation} />)}
      {sectionList && <SectionListItem data={data} navigation={navigation} />}
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    // backgroundColor:colors.primary
  },
  transaction: {
    flexDirection: 'row',
    marginHorizontal: 10,
    shadowColor: '#FFFFFF',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 16,
    // JustifyContent: 'space-between',
  },
  header: {
    flex: 1,
  },
  SeeAll: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
