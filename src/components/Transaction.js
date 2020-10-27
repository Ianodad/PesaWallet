import React from 'react';
import Text from '../components/Text';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import IconButton from './IconButton';
import colors from '../config/colors';

const Transaction = ({type, name, date, time, amount, transactionCost}) => {
  const Image = () => {
    switch (type) {
      case 'Sent':
        return require('../assets/buttons/Sent.png');
      case 'Receive':
        return require('../assets/buttons/Receive.png');
      case 'Deposit':
        return require('../assets/buttons/Deposit.png');
      case 'Withdraw':
        return require('../assets/buttons/Withdraw.png');
      case 'PayBill':
        return require('../assets/buttons/PayBill.png');
      case 'BuyGoods':
        return require('../assets/buttons/BuyGoods.png');
      case 'Airtime':
        return require('../assets/buttons/Airtime.png');
      case 'Reverse':
        return require('../assets/buttons/Reverse.png');
      default:
        return require('../assets/buttons/All.png');
    }
  };
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.leftCard}>
          <IconButton
            resizeMode="contain"
            type={type}
            style={styles.button}
            logoStyle={styles.logo}
            image={Image()}
            color={'primary'}
          />
        </View>
        <View style={styles.center}>
          <View style={styles.cardDetails}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.dateTime}>
              {date} {time}
            </Text>
          </View>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.amount}>Ksh {amount}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 60,
    borderRadius: 10,
    // borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    // width: 130,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  leftCard: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    flex: 1,
  },
  center: {
    // backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    flex: 2,
  },
  cardRight: {
    // backgroundColor: colors.red,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    flex: 1,
    width: 55,
    margin: 5,
  },
  logo: {
    width: 40,
    // height:30,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 1,
  },
  dateTime: {
    marginVertical: 1,
  },
  amount: {},
});
