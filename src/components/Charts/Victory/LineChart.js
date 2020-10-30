import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  VictoryLine,
  VictoryChart,
  VictoryTooltip,
  VictoryTheme,
  VictoryScatter,
  VictoryLabel,
  VictoryGroup,
  VictoryVoronoiContainer,
} from 'victory-native';

import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000},
];

class LineChart extends Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={screenWidth} padding={60}>
          <VictoryLine
            style={{
              axis: {stroke: 'white'},
              axisLabel: {fontSize: 20, padding: 30},
              grid: {stroke: ({tick}) => (tick > 0.5 ? 'red' : 'grey')},
              ticks: {stroke: 'grey', size: 5},
              tickLabels: {fontSize: 15, padding: 5},
              marginLeft: '70',
            }}
            interpolation="natural"
            data={[
              {x: 1, y: 2},
              {x: 2, y: 3},
              {x: 3, y: 5},
              {x: 4, y: 4},
              {x: 5, y: 6},
            ]}
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 25,
    // alignItems: 'center',
    // backgroundColor: '#f5fcff',
  },
});

export default LineChart;
