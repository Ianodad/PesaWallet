import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Type from './Type';

const data = [
  {
    id: 1,
    title: 'All',
    image: require('../assets/buttons/All.png'),
    amount: 'Ksh1000',
  },
  {
    id: 2,
    title: 'Sent',
    image: require('../assets/buttons/Sent.png'),
    amount: 'Ksh1300',
  },
  {
    id: 3,
    title: 'Receive',
    image: require('../assets/buttons/Receive.png'),
    amount: 'Ksh1700',
  },
  {
    id: 4,
    title: 'Deposit',
    image: require('../assets/buttons/Deposit.png'),
    amount: 'Ksh500',
  },
  {
    id: 5,
    title: 'Withdraw',
    image: require('../assets/buttons/Withdraw.png'),
    amount: 'Ksh100',
  },
  {
    id: 6,
    title: 'PayBill',
    image: require('../assets/buttons/PayBill.png'),
    amount: 'Ksh30000',
  },
  {
    id: 7,
    title: 'BuyGoods',
    image: require('../assets/buttons/BuyGoods.png'),
    amount: 'Ksh4000',
  },
  {
    id: 8,
    title: 'Airtime',
    image: require('../assets/buttons/Airtime.png'),
    amount: 'Ksh5000',
  },
  {
    id: 9,
    title: 'Reverse',
    image: require('../assets/buttons/Reverse.png'),
    amount: 'Ksh7700',
  },
];

const TypeList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={data}
        contentInset={{margin: 16}}
        horizontal
        keyExtractor={(icon) => icon.id.toString()}
        renderItem={({item}) => (
          <Type
            style={styles.type}
            image={item.image}
            title={item.title}
            amount={item.amount}
          />
        )}
      />
    </View>
  );
};

export default TypeList;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginVertical: 5,
    marginLeft: 10,
    height: 55,
  },
  button: {
    // backgroundColor: colors.medium,
    paddingVertical: 5,
    marginHorizontal: 5,
    width: 70,
    height: 70,
  },
});
