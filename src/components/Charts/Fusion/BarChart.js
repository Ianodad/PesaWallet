import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

class BarChart extends Component {
  constructor(props) {
    super(props);
    //STEP 2 - Chart Data
    const chartData = [
      {label: 'Venezuela', value: '290'},
      {label: 'Saudi', value: '260'},
      {label: 'Canada', value: '180'},
      {label: 'Iran', value: '140'},
      {label: 'Russia', value: '115'},
      {label: 'UAE', value: '100'},
      {label: 'US', value: '30', color: '#e44a00'},
      {label: 'China', value: '30'},
    ];
    //STEP 3 - Chart Configurations
    const chartConfig = {
      type: 'column2d',
      width: '100%',
      height: '250',
      dataFormat: 'json',
      dataSource: {
        chart: {
          // caption: 'Countries With Most Oil Reserves [2017-18]',
          // subCaption: 'In MMbbl = One Million barrels',
          // xAxisName: 'Country',
          // yAxisName: 'Reserves (MMbbl)',
          numberSuffix: 'K',
          theme: 'umber',
          bgColor: '#FFFFFF',
          showAlternateVGridColor: '1',
          showBorder: '0',
          chartLeftMargin: '10',
          // chartBottomMargin: "40",
          // bgAlpha: '0',
          // divLineAlpha: '0',
          containerBackgroundOpacity: '0',
          formatnumberscale: "1",
          canvasBorderAlpha: '0',
          adjustDiv: '0',
          numDivLines: '5',
          // divLineDashed: '1',
          plotHoverEffect: '1',
          showXAxisLine: "0",

        },
        data: chartData,
      },
    };
    this.state = chartConfig;
    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      android: {
        uri: 'file:///android_asset/fusioncharts.html',
      },
      // ios: require('./assets/fusioncharts.html'),
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>A Column 2D Chart</Text>

        <View style={styles.chartContainer}>
          <FusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property
          />
        </View>
      </View>
    );
  }
}

export default BarChart;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // padding: 10,
  },

  header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    // paddingBottom: 10,
  },

  chartContainer: {
    height: 400,
    // borderColor: '#ffff',
    // borderWidth: 1,
  },
});
