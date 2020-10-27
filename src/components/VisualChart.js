import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import BarChart from "../components/Charts/Fusion/BarChart"
import LineChart from "../components/Charts/Fusion/LineChartFusion"

// import LineChart from './Charts/Victory/LineChart';
import {Dimensions} from 'react-native';
import RangeList from './RangeList';


const VisualChart = () => {
  return (
    <View style={styles.container}>
      <LineChart />
      {/* <BarChart/> */}
      <View style={styles.chartButton}>
        <RangeList />
      </View>
    </View>
  );
};

export default VisualChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartButton: {
    justifyContent: 'center',
  },
});
