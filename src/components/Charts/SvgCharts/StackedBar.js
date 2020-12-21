import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackedBarChart, XAxis, YAxis, Grid} from 'react-native-svg-charts';
import {Dimensions} from 'react-native';
var _ = require('lodash');
var dayjs = require('dayjs');

class StackedBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setData = (datas, range) => {
    // range
    let summed = _(datas)
      .groupBy('DATE')
      .map((objs, key) => {
        return {
          Moment:
            range == 'week' ? dayjs(key).format('ddd') : dayjs(key).format('D'),
          Sent: _.sumBy(_.filter(objs, {TYPE: 'Sent'}), 'AMOUNT'),
          Receive: _.sumBy(_.filter(objs, {TYPE: 'Receive'}), 'AMOUNT'),
          Deposit: _.sumBy(_.filter(objs, {TYPE: 'Deposit'}), 'AMOUNT'),
          Withdraw: _.sumBy(_.filter(objs, {TYPE: 'Withdraw'}), 'AMOUNT'),
          PayBill: _.sumBy(_.filter(objs, {TYPE: 'PayBill'}), 'AMOUNT'),
          BuyGoods: _.sumBy(_.filter(objs, {TYPE: 'BuyGoods'}), 'AMOUNT'),
          Airtime: _.sumBy(_.filter(objs, {TYPE: 'Airtime'}), 'AMOUNT'),
          Reverse: _.sumBy(_.filter(objs, {TYPE: 'Reverse'}), 'AMOUNT'),
          svg: {
            onPress: () => console.log('onPress'),
          },
        };
      })
      .value();
    console.log(summed);
    return summed;
    // console.log(this.props.datas);
  };

  render() {
    const {orientation, datas, range} = this.props;
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
      'PayBill',
      'BuyGoods',
      'Airtime',
      'Reverse',
    ];
    const data = this.setData(datas, range);
    // {console.log(datas)}
    return (
      <View style={styles.container}>
        <StackedBarChart
          style={{height: orientation ? 250 : 305}}
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
    marginTop: 20,
    marginLeft: 10,
    paddingHorizontal: 4,
  },
});
