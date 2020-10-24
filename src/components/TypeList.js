import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import IconButton from './IconButton';
import colors from '../config/colors';
import Type from './Type';

const data = [
  {
    id: 1,
    title: 'All',
    image: require('../assets/source/buttons/All.png'),
  },
  {
    id: 2,
    title: 'Sent',
    image: require('../assets/source/buttons/Sent.png'),
  },
  {
    id: 3,
    title: 'Receive',
    image: require('../assets/source/buttons/Recieve.png'),
  },
  {
    id: 4,
    title: 'Deposit',
    image: require('../assets/source/buttons/Deposit.png'),
  },
  {
    id: 5,
    title: 'Withdraw',
    image: require('../assets/source/buttons/Withdraw.png'),
  },
  {
    id: 6,
    title: 'PayBill',
    image: require('../assets/source/buttons/PayBill.png'),
  },
  {
    id: 7,
    title: 'BuyGoods',
    image: require('../assets/source/buttons/BuyGoods.png'),
  },{
    id: 8,
    title: 'Airtime',
    image: require('../assets/source/buttons/Airtime.png'),
  },{
    id: 9,
    title: 'Reverse',
    image: require('../assets/source/buttons/Reverse.png'),
  }
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
          <Type style={styles.type} image={item.image} title={item.title}/>
        )}
      />
    </View>
  );
};

export default TypeList;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    marginVertical: 5,
    backgroundColor: colors.medium,
    paddingVertical: 5,
    marginHorizontal: 5,
    width: 70,
    height: 70,
  },
});
