import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Transaction from './Transaction';

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
  },{
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
  }

];
const TransactionList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction</Text>
      <FlatList
        data={data}
        howsVerticalScrollIndicator={false}
        keyExtractor={(type) => type.id.toString()}
        renderItem={({item}) => (
          <Transaction
            style={styles.transaction}
            type={item.type}
            name={item.name}
            date={item.date}
            time={item.time}
            amount={item.amount}
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
  },
});
