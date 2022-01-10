import React from 'react';
import DayJS from 'react-dayjs';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {NumberCommas} from '../_helpers/NumberCommas';
import Text from '../components/Text';
import colors from '../config/colors';
import defaultStyles from '../config/styles';
import IconButton from './Button/IconButton';

// import DateLineSeparator from './DateLineSeparator';

const Transaction = ({
  id,
  phoneNo,
  type,
  name,
  date,
  time,
  amount,
  detail,
  finance,
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

  if (finance == 'Debit') {
    amount = `-${NumberCommas(amount)}`;
  } else {
    amount = NumberCommas(amount);
  }
  return (
    <View>
      {/* <DateLineSeparator date={date}/> */}
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
                    navigation.navigate('FilteredDetailsScreen', {
                      id: phoneNo || name,
                      title: name,
                      phoneNo: phoneNo,
                    })
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
              <View style={styles.dateTime}>
                <Text style={styles.dateTime}>
                  {date} - {time}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.cardRight}>
            <Text style={[styles.amount, {color: colors[finance]}]}>
              {amount}/=
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
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
    shadowColor: '#7A7A7A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2.6,
    elevation: 5,
  },
  leftCard: {
    flex: 1,
    backgroundColor: defaultStyles.colors.white,
    alignItems: 'center',
  },
  center: {
    // backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    flex: 2.5,
  },
  cardRight: {
    flexDirection: 'row-reverse',
    // backgroundColor: colors.red,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.31,
    marginLeft: 10,
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
    fontSize: defaultStyles.textLarge.fontSize,
    marginVertical: 1,
  },
  dateTime: {
    color: defaultStyles.colors.medium,
    fontSize: defaultStyles.textSmall.fontSize,
    marginVertical: 1,
  },
  amount: {
    borderRadius: 10,
    fontWeight: 'bold',
    // color: colors.white,
    // backgroundColor: colors.primary,
    textShadowRadius: 2,
    textShadowOffset: {width: 0, height: 1},
    textShadowColor: 'black',

    // shadowColor: '#FFFFFF',
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // elevation: 4,
  },
});
