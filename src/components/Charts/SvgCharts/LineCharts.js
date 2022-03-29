import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {LineChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

class LineCharts extends Component {
  render() {
    const {data, colors} = this.props;
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
          style={{height: responsiveHeight(30)}}
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
