import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Rect, Text as TextSVG, Svg} from 'react-native-svg';
import * as shape from 'd3-shape';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions'
const LineChartsV3 = () => {
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  return (
    <View style={styles.container}>
      <LineChart
        showGrid={false}
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [100 , 110, 90, 130, 80, 103],
            },
          ],
        }}
        // curve={shape.curveNatural}
        width={responsiveWidth(105)}
        height={responsiveWidth(60)}
        // yAxisLabel="$"
        yAxisSuffix="k"
        // svg={{ stroke: 'rgb(134, 65, 244)' }}
        // yAxisInterval={1}
        chartConfig={{
          showGrid: false,
          backgroundColor: 'green',
          // propsForBackgroundLines: {
          //   strokeWidth: 0,
          // },
          strokeWidth: 5,
          backgroundGradientFrom: '#1E2923',
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: '#08130D',
          backgroundGradientToOpacity: 0,
          decimalPlaces: 0,
          color: (opacity = 0.9) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '2',
            strokeWidth: '2',
            stroke: 'green',
          },
        }}
        bezier
        style={{
          // marginTop: 45,
        }}
        decorator={() => {
          return tooltipPos.visible ? (
            <View>
              <Svg>
                <Rect
                  x={tooltipPos.x - 15}
                  y={tooltipPos.y + 10}
                  width="40"
                  height="30"
                  fill="blue"
                />
                <TextSVG
                  x={tooltipPos.x + 5}
                  y={tooltipPos.y + 30}
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle">
                  {tooltipPos.value}
                </TextSVG>
              </Svg>
            </View>
          ) : null;
        }}
        onDataPointClick={(data) => {
          let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;

          isSamePoint
            ? setTooltipPos((previousState) => {
                return {
                  ...previousState,
                  value: data.value,
                  visible: !previousState.visible,
                };
              })
            : setTooltipPos({
                x: data.x,
                value: data.value,
                y: data.y,
                visible: true,
              });
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
});
export default LineChartsV3;
