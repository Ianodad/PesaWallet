import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackedBarChart, XAxis, YAxis, Grid} from 'react-native-svg-charts';
import {Dimensions} from 'react-native';

const data = [
  {
    Moment: 'Mon',
    Sent: 9760,
    Receive: 960,
    Deposit: 400,
    Withdraw: 400,
    Paybill: 300,
    BuyGoods: 900,
    Airtime: 300,
    Reverse: 100,
  },
  {
    Moment: 'Tue',
    Sent: 200,
    Receive: 960,
    Deposit: 400,
    Withdraw: 400,
    Paybill: 400,
    BuyGoods: 900,
    Airtime: 900,
    Reverse: 0,
  },
  {
    Moment: 'Wed',
    Sent: 19230,
    Receive: 960,
    Deposit: 400,
    Withdraw: 800,
    Paybill: 400,
    BuyGoods: 900,
    Airtime: 300,
    Reverse: 800,
  },
  {
    Moment: 'Thu',
    Sent: 1000,
    Receive: 960,
    Deposit: 400,
    Withdraw: 600,
    Paybill: 400,
    BuyGoods: 900,
    Airtime: 200,
    Reverse: 100,
  },
  {
    Moment: 'Fri',
    Sent: 820,
    Receive: 360,
    Deposit: 400,
    Withdraw: 400,
    Paybill: 400,
    BuyGoods: 900,
    Airtime: 100,
    Reverse: 700,
  },
  {
    Moment: 'Sat',
    Sent: 1940,
    Receive: 960,
    Deposit: 400,
    Withdraw: 400,
    Paybill: 100,
    BuyGoods: 900,
    Airtime: 300,
    Reverse: 0,
  },
  {
    Moment: 'Sun',
    Sent: 3320,
    Receive: 960,
    Deposit: 400,
    Withdraw: 400,
    Paybill: 400,
    BuyGoods: 900,
    Airtime: 900,
    Reverse: 800,
  },
];
class StackedBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {orientation} = this.props;
    const colors = [
      '#ff5252',
      '#39b54b',
      '#5b64ae',
      '#ed6e25',
      '#fed304',
      '#880085',
      '#f33c7E',
      '#9c5518',
    ];
    const keys = [
      'Sent',
      'Receive',
      'Deposit',
      'Withdraw',
      'Paybill',
      'BuyGoods',
      'Airtime',
      'Reverse',
    ];
    return (
      <View style={styles.container}>
        <StackedBarChart
          style={{height: orientation ?  250 : 305}}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={false}
          contentInset={{top: 30, bottom: 10}}
          valueAccessor={({item, key}) => item[key].value || item[key]}>
          <Grid />
        </StackedBarChart>
        <XAxis
          style={{marginHorizontal: 5}}
          data={data}
          formatLabel={(value, index) => data[index].Moment}
          contentInset={{left: 10, right: 10}}
          svg={{fontSize: 16, fill: 'black', alignItems: 'center'}}
        />
        <YAxis
          style={{width: 30}}
          data={data}
          contentInset={{left: 20}}
          svg={{fontSize: 12, fontWeight: '700'}}
          formatLabel={(value, index) => data[index].Moment}
          // scale={scale.scaleBand}
        />
      </View>
    );
  }
}

export default StackedBar;

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    marginLeft: 10,
    paddingHorizontal:4
  },
});

