import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import BarChart from '../components/Charts/Fusion/BarChart';
// import LineChart from '../components/Charts/Fusion/LineChartFusion';

// import LineChart from './Charts/Victory/LineChart';
import {Dimensions} from 'react-native';
import RangeList from './RangeList';
import LineChartFusionTwo from './Charts/Fusion/LineChartFusionTwo';
import LineChartVictory from './Charts/Victory/LineChart';
import PieChartVicrort from './Charts/Victory/PieChartVictory';
import BrushZoom from './Charts/Victory/BrushZoom';
import LineCharts from './Charts/SvgCharts/LineCharts.js';
import DecoratorCharts from './Charts/SvgCharts/DecoratorCharts';
import LineChartsV2 from './Charts/SvgCharts/LineChartsV2';
import LineChartV3 from './Charts/SvgCharts/LineChartsV3';
const VisualChart = ({data, colors}) => {
  return (
    <View style={styles.container}>
      {/* <PieChartVicrort/> */}
      {/* <BrushZoom/> */}
      {/* <LineChartVictory /> */}
      {/* <LineChartsV2/> */}
      {/* <DecoratorCharts /> */}
      {/* <LineChartV3 /> */}
      <LineCharts data={data} colors={colors} />
      {/* <View style={styles.chartButton}><RangeList /></View> */}
    </View>
  );
};

export default VisualChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
  chartButton: {
    // justifyContent: 'center',
  },
});
