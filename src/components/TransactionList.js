import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';

import Text from './Text';
import Transaction from './Transaction';

import colors from '../config/colors';
import DateLineSeparator from '../components/DateLineSeparator';
import FlatListItem from './List/FlatListItem';
import SectionListItem from './List/SectionListIem';
import defaultStyles from '../../config/styles';

const TransactionList = ({
  navigation,
  data,
  flatList,
  title,
  sectionList,
  header,
}) => {
  // console.log(messages)
  return (
    <View style={styles.container}>
      <View style={styles.transaction}>
        {header && <Text style={styles.header}>Transactions</Text>}
        {header && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FilteredDetailsScreen', {
                data: data,
                title: title,
              })
            }>
            <Text style={styles.ShowAll}>Show All</Text>
          </TouchableOpacity>
        )}
      </View>
      {flatList && <FlatListItem data={data} navigation={navigation} />}
      {sectionList && <SectionListItem data={data} navigation={navigation} />}
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 5,
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
    fontWeight: 'bold',
    fontSize: 20,
  },
  ShowAll: {
    marginRight: 2,
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
