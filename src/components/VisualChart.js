import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import BarChart from "../components/Charts/Fusion/BarChart"
import LineChart from "../components/Charts/Fusion/LineChartFusion"

// import LineChart from './Charts/Victory/LineChart';
import {Dimensions} from 'react-native';
import RangeList from './RangeList';
import LineChartFusionTwo from './Charts/Fusion/LineChartFusionTwo';
import LineChartVictory from "./Charts/Victory/LineChart"
import PieChartVicrort from "./Charts/Victory/PieChartVictory"
const VisualChart = () => {
  return (
    <View style={styles.container}>
    {/* <PieChartVicrort/> */}
    <LineChartVictory/>
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
