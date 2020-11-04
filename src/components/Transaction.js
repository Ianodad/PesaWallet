import React from 'react';
import Text from '../components/Text';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import IconButton from './Button/IconButton';
import colors from '../config/colors';
import DateLineSeparator from './DateLineSeparator';

const Transaction = ({
  id,
  type,
  name,
  date,
  time,
  amount,
  detail,
  separator,
  transactionCost,
  navigation,
  onPress,
}) => {
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
    <View>
      {DateLineSeparator(date)}
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.leftCard}>
            <IconButton
              resizeMode="contain"
              type={type}
              style={styles.button}
              imageStyle={styles.image}
              image={Image()}
              detail={detail}
              color={type}
            />
          </View>
          <View style={styles.center}>
            <View style={styles.cardDetails}>
              {navigation && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('FilteredDetailsScreen', id)
                  }>
                  <Text
                    style={styles.name}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {name}
                  </Text>
                </TouchableOpacity>
              )}
              {!navigation && (
                <Text
                  style={styles.name}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {name}
                </Text>
              )}
              <Text style={styles.dateTime}>
                {date} {time}
              </Text>
            </View>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.amount}>Ksh{amount}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
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
    shadowColor: '#FFFFFF',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 16,
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
    padding: 5,
    shadowColor: '#FFFFFF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 16,
  },
  image: {
    width: 40,
    // height:30,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 1,
  },
  dateTime: {
    color: colors.medium,
    fontSize: 14,
    marginVertical: 1,
  },
  amount: {
    borderRadius: 10,
    backgroundColor: colors.primary,
    shadowColor: '#FFFFFF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
  },
});
