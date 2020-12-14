import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {StackedBarChart, XAxis, Grid} from 'react-native-svg-charts';
import { Dimensions } from 'react-native';


const data = [
  {
    month: 'Jan',
    apples: 3840,
    bananas: 1920,
    cherries: 960,
    dates: 400,
    oranges: 400,
  },
  {
    month: 'Feb',
    apples: 1600,
    bananas: 1440,
    cherries: 960,
    dates: 400,
  },
  {
    month: 'March',
    apples: 640,
    bananas: 960,
    cherries: 3640,
    dates: 400,
  },
  {
    month: 'April',
    apples: 3320,
    bananas: 480,
    cherries: 640,
    dates: 400,
  },
];
class StackedBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const colors = ['#ff7d7d', '#65cd73', '#848ac2', '#f1925b'];
    const keys = ['apples', 'bananas', 'cherries', 'dates'];
    return (
      <>
        <StackedBarChart
          style={{height: 200}}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={false}
          contentInset={{top: 30, bottom: 10}}
          valueAccessor={({item, key}) => item[key].value || item[key]}
        />
        {/* <Grid /> */}
        <XAxis
          style={{marginHorizontal: 10}}
          data={data}
          formatLabel={(value, index) => data[index].month}
          contentInset={{left: 12, right: 12}}
          svg={{fontSize: 10, fill: 'black'}}
        />
      </>
    );
  };
}

export default StackedBar;
