import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {NumberCommas} from '../_helpers/NumberCommas';
import color from '../config/colors';
import Text from './Text';
import TitleHeader from './TitleHeader';

const typesImage = {
  Sent: require('../assets/buttons/Sent.png'),
  Receive: require('../assets/buttons/Receive.png'),
  Deposit: require('../assets/buttons/Deposit.png'),
  Withdraw: require('../assets/buttons/Withdraw.png'),
  PayBill: require('../assets/buttons/PayBill.png'),
  BuyGoods: require('../assets/buttons/BuyGoods.png'),
};
const ProviderDetail = ({Title, AggregatoredData}) => {
  return (
    !!AggregatoredData && (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {Title?.toUpperCase()}
            <Text style={{color: 'grey'}}>-Weekly</Text>
          </Text>
        </View>
        <View style={styles.body}>
          {AggregatoredData.map((data, key) => (
            <View key={key} style={styles.row}>
              <View style={styles.rowLeft}>
                <Image style={styles.image} source={typesImage[data.TYPE]} />
                <Text style={styles.text}>{data.TYPE}</Text>
              </View>
              <Text style={styles.textPrice}>
                <Text style={{fontSize: 10}}>Ksh </Text>
                {NumberCommas(data.AMOUNT)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    )
  );
};

export default ProviderDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginVertical: 10,
    paddingVertical: 10,
    // alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
    // backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: 300,
    alignItems: 'center',
    // paddingVertical:5,
    // marginHorizontal: 10,
  },
  rowLeft: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  image: {
    height: 15,
    width: 15,
    marginRight: 10,
    marginTop: 3,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 25,
  },
  title: {
    color: '#000',
    fontSize: 23,
    fontWeight: 'bold',
    marginVertical: 10,
    alignItems: 'center',
  },
  textPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    color: color.medium,
  },
  text: {
    // color: '#00008B',
    fontSize: 16,
    // marginVertical: 10,
    fontWeight: 'bold',
    // backgroundColor: 'green'
    // marginHorizontal: 25,
  },
});
