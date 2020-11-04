import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';

import Text from './Text';
import Transaction from './Transaction';

import colors from '../config/colors';
import {nameTitleCase} from '../_helpers/NameTitleCase';
import DateLineSeparator from '../components/DateLineSeparator'

const TransactionList = ({navigation, data, seperator}) => {
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
      <FlatList
        data={data}
        // howsVerticalScrollIndicator={false}
        // ItemSeparatorComponent={DateLineSeparator}
        // ListHeaderComponent={DateLineSeparator}
        // ListFooterComponent={DateLineSeparator}
        keyExtractor={(type) => type.ID.toString()}
        renderItem={({item}) => (
          <Transaction
            style={styles.transaction}
            id={item.ID}
            type={item.TYPE}
            name={nameTitleCase(item.NAME)}
            date={item.DATE}
            time={item.TIME}
            cost={item.COST}
            amount={item.AMOUNT}
            navigation={navigation}
            // separator={DateLineSeparator(item.DATE)}
            // transactionCost={item.transactionCost}
          />
        )}
      />
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
