import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
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

responsiveWidth(70);
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
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(82),
    height: responsiveWidth(10),
    alignItems: 'center',
    marginVertical: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E4E7',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignItems: 'flex-start',

    marginVertical: 1,
    marginLeft: 10,
    // width: 400,
  },
  image: {
    height: 13,
    width: 16,
    marginRight: 10,
    // marginTop: 5,
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
    // justifyContent: 'space-between',
    // alignItems: 'flex-start',
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
    // fontSize: 15,
    fontSize: responsiveWidth(4),
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    color: color.medium,
  },
  text: {
    // color: '#00008B',
    fontSize: 16,
    // paddingVertical: 1,
    // marginVertical: 10,
    fontWeight: 'bold',
    // marginBottom: 10,
    // backgroundColor: 'green'
    // marginHorizontal: 25,
  },
});
