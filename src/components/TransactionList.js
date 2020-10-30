import React from 'react';
import Text from './Text';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import FilteredDetailsScreen from "../screens/FilteredDetailsScreen";
import Transaction from './Transaction';
import colors from '../config/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {messages} from "../services/messagesCollection"
import {nameTitleCase} from "../_helpers/NameTitleCase";

const data = [
  {
    id: 1,
    type: 'Sent',
    name: 'Jack Reacher',
    date: 'July 20 2020',
    time: '3:00PM',
    amount: 1000,
    transactionCost: 30,
  },
  {
    id: 2,
    type: 'Receive',
    name: 'Steve Jobs',
    date: 'July 20 2020',
    time: '8:00AM',
    amount: 14000,
    transactionCost: 30,
  },
  {
    id: 3,
    type: 'Withdraw',
    name: 'Elon Musk',
    date: 'July 20 2020',
    time: '7:41PM',
    amount: 3000,
    transactionCost: 10,
  },
  {
    id: 4,
    type: 'Deposit',
    name: 'Mash Jones',
    date: 'July 20 2020',
    time: '8:10PM',
    amount: 8000,
    transactionCost: 0,
  },
  {
    id: 5,
    type: 'PayBill',
    name: 'John Otieno',
    date: 'July 20 2020',
    time: '5:30PM',
    amount: 500,
    transactionCost: 20,
  },
  {
    id: 6,
    type: 'BuyGoods',
    name: 'Kate Nyoroge',
    date: 'July 20 2020',
    time: '3:51PM',
    amount: 200,
    transactionCost: 0,
  },
  {
    id: 7,
    type: 'Airtime',
    name: 'Kate Nyoroge',
    date: 'July 20 2020',
    time: '3:51PM',
    amount: 200,
    transactionCost: 0,
  },
  {
    id: 8,
    type: 'Reverse',
    name: 'Kate Nyoroge',
    date: 'July 20 2020',
    time: '3:51PM',
    amount: 200,
    transactionCost: 0,
  },
];

const TransactionList = ({navigation}) => {
  // console.log(messages)
  return (
    <View style={styles.container}>
      <View style={styles.transaction}>
        <Text style={styles.header}>Transaction</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FilteredDetailsScreen', data[0].item)
          }>
          <Text style={styles.SeeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        howsVerticalScrollIndicator={false}
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
