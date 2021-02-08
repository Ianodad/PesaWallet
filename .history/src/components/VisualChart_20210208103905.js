import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import BarChart from '../components/Charts/Fusion/BarChart';
// import LineChart from '../components/Charts/Fusion/LineChartFusion';

// import LineChart from './Charts/Victory/LineChart';
import {Dimensions} from 'react-native';
import RangeList from './RangeList';

// Chart imports
// react-native-fusioncharts
import LineChartFusionTwo from './Charts/Fusion/LineChartFusionTwo';
// victory-native
import LineChartVictory from './Charts/Victory/LineChart';
import PieChartVicrort from './Charts/Victory/PieChartVictory';
import BrushZoom from './Charts/Victory/BrushZoom';
// react-native-svg-charts
import LineCharts from './Charts/SvgCharts/LineCharts.js';
import DecoratorCharts from './Charts/SvgCharts/DecoratorCharts';
import LineChartsV2 from './Charts/SvgCharts/LineChartsV2';
import LineChartV3 from './Charts/SvgCharts/LineChartsV3';
import PieCharts from './Charts/SvgCharts/PieCharts';
import PieChartsV2 from './Charts/SvgCharts/PieChartsV2';
import StackedBar from './Charts/SvgCharts/StackedBar';

const VisualChart = ({
  data,
  range,
  colors,
  height,
  orientation,
  selectedType,
}) => {
  // console.log("hapa"+selectedType)
  return (
    <View style={styles.container}>
      {/* <PieChartVicrort/> */}
      {/**** * <BrushZoom/> */}
      {/***<LineChartVictory /> */}
      {/* <LineChartsV2/> */}
      {/* <DecoratorCharts /> */}
      {/* <LineChartV3 /> */}
      {/* <LineChartFusionTwo/> */}
      {/* <LineCharts data={data} colors={colors} /> */}
      {/* <View style={styles.chartButton}><RangeList /></View> */}

      <PieCharts
        datas={data}
        selerange={range}
        selectedType={selectedType}
        orientation={orientation}
      />
      {/* <PieChartsV2 data={data} orientation={orientation} /> */}
      {/* <StackedBar datas={data} range={range} orientation={orientation}/> */}
    </View>
    // <View style={styles.container}>
    //   <GestureRecognizer
    //     // onSwipe={(direction, state) => this.onSwipe(direction, state)}
    //     onSwipeLeft={() => this.onSetPrevData()}
    //     onSwipeRight={() => this.onSetNextData()}
    //     config={config}
    //     style={{height:"100%"}}
    //     >
    //        <LineCharts data={data} colors={colors} />
    //   </GestureRecognizer>
    // </View>
  );
};

export default VisualChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  chartButton: {
    // justifyContent: 'center',
  },
});
