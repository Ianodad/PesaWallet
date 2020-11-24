import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {LineChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

class LineCharts extends Component {
  render() {
        const {data, colors} = this.props;
    // const data = [
    //   500,
    //   100,
    //   4000,
    //   950,
    //   40,
    //   240,
    //   857,
    //   910,
    //   357,
    //   536,
    //   530,
    //   249,
    //   509,
    //   20000,
    //   8000,
    //   500,
    //   100,
    //   4000,
    //   950,
    //   40,
    //   240,
    //   857,
    //   910,
    //   357,
    //   536,
    //   530,
    //   249,
    //   509,
    //   20000,
    //   8000,
    // ];
    const Gradient = () => (
      <Defs key={'gradient'}>
        <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
          <Stop offset={'30%'} stopColor={colors[0]} />
          <Stop offset={'100%'} stopColor={colors[2]} />
        </LinearGradient>
      </Defs>
    );

    return (
      <View style={styles.container}>
        <LineChart
          style={{height: 220}}
          data={data}
          showGrid={false}
          contentInset={{top: 20, bottom: 20}}
          curve={shape.curveNatural}
          svg={{
            strokeWidth: 6,
            stroke: 'url(#gradient)',
          }}>
          {/* <Grid /> */}
          <Gradient />
        </LineChart>
      </View>
    );
  }
}

export default LineCharts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
