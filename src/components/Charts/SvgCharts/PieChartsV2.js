import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-svg-charts';

class PieChartsV2 extends Component {
  render() {
    const data = [
      {
        key: 1,
        value: 50,
        svg: {fill: '#600080'},
        // arc: {outerRadius: '130%', cornerRadius: 10},
      },
      {
        key: 2,
        value: 50,
        svg: {fill: '#9900cc'},
        // arc: {outerRadius: '130%', cornerRadius: 10},
      },
      {
        key: 3,
        value: 40,
        svg: {fill: '#c61aff'},
        // arc: {outerRadius: '130%', cornerRadius: 10},
      },
      {
        key: 4,
        value: 95,
        svg: {fill: '#d966ff'},
        // arc: {outerRadius: '130%', cornerRadius: 10},
      },
      {
        key: 5,
        value: 35,
        svg: {fill: '#ecb3ff'},
        // arc: {outerRadius: '130%', cornerRadius: 10},
      },
    ];
    const {orientation}= this.props;
    return (
      <View style={styles.container}>
        <PieChart
          style={{height: orientation ? 340: 400}}
          outerRadius={'70%'}
          innerRadius={10}
          data={data}
        />
      </View>
    );
  }
}

export default PieChartsV2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
