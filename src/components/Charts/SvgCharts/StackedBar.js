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
    // console.log(datas);
    // console.log(range);

    var result = _.chain(datas)
      .groupBy((datum) =>
        range == 'year' || range == 'max'
          ? dayjs(datum.DATE).format('MMM').toLocaleUpperCase()
          : datum.DATE,
      )
      .map((objs, key) => {
        return {
          Moment:
            range == 'year'
              ? key
              : range == 'week'
              ? dayjs(key).format('ddd')
              : dayjs(key).format('D'),
          Sent: {
            value: _.sumBy(_.filter(objs, {TYPE: 'Sent'}), 'AMOUNT'),
            svg: {
              onPress: () =>
                console.log(
                  `Sent-${_.sumBy(_.filter(objs, {TYPE: 'Sent'}), 'AMOUNT')}`,
                ),
            },
          },
          Receive: {
            value: _.sumBy(_.filter(objs, {TYPE: 'Receive'}), 'AMOUNT'),
            svg: {
              onPress: () =>
                console.log(
                  `Receive-${_.sumBy(
                    _.filter(objs, {TYPE: 'Receive'}),
                    'AMOUNT',
                  )}`,
                ),
            },
          },
          Deposit: {
            value: _.sumBy(_.filter(objs, {TYPE: 'Deposit'}), 'AMOUNT'),
            svg: {
              onPress: () =>
                console.log(
                  `Deposit-${_.sumBy(
                    _.filter(objs, {TYPE: 'Deposit'}),
                    'AMOUNT',
                  )}`,
                ),
            },
          },
          Withdraw: {
            value: _.sumBy(_.filter(objs, {TYPE: 'Withdraw'}), 'AMOUNT'),
            svg: {
              onPress: () =>
                console.log(
                  `Withdraw-${_.sumBy(
                    _.filter(objs, {TYPE: 'Withdraw'}),
                    'AMOUNT',
                  )}`,
                ),
            },
          },
          PayBill: {
            value: _.sumBy(_.filter(objs, {TYPE: 'PayBill'}), 'AMOUNT'),
            svg: {
              onPress: () =>
                console.log(
                  `PayBill-${_.sumBy(
                    _.filter(objs, {TYPE: 'PayBill'}),
                    'AMOUNT',
                  )}`,
                ),
            },
          },
          BuyGoods: {
            value: _.sumBy(_.filter(objs, {TYPE: 'BuyGoods'}), 'AMOUNT'),
            svg: {
              onPress: () =>
                console.log(
                  `BuyGoods-${_.sumBy(
                    _.filter(objs, {TYPE: 'BuyGoods'}),
                    'AMOUNT',
                  )}`,
                ),
            },
          },
          Airtime: {
            value: _.sumBy(_.filter(objs, {TYPE: 'Airtime'}), 'AMOUNT'),
            svg: {
              onPress: () =>
                console.log(
                  `Airtime-${_.sumBy(
                    _.filter(objs, {TYPE: 'Airtime'}),
                    'AMOUNT',
                  )}`,
                ),
            },
          },
          Reverse: {
            value: _.sumBy(_.filter(objs, {TYPE: 'Reverse'}), 'AMOUNT'),
            svg: {
              onPress: () =>
                console.log(
                  `Reverse-${_.sumBy(
                    _.filter(objs, {TYPE: 'Reverse'}),
                    'AMOUNT',
                  )}`,
                ),
            },
          },
        };
      })
      .value();

    // range
    return  result;
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
