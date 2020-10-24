import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import IconButton from './IconButton';
import colors from '../config/colors';

const Transaction = ({type, name, date, time, amount, transactionCost}) => {
  const image = require('../assets/source/buttons/All.png');
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.leftCard}>
          <IconButton
            resizeMode="contain"
            style={styles.button}
            image={image}
            color={colors.white}
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
    backgroundColor: colors.primary,
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
  },
  leftCard: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  center: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    flex: 2,
  },
  cardRight: {
    backgroundColor: colors.red,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    marginBottom: 1,
    backgroundColor: colors.medium,
    width: 40,
  },
  name: {
    marginVertical: 1,
  },
  dateTime: {
    marginVertical: 1,
  },
  amount: {},
});
