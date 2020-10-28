import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  VictoryLine,
  VictoryChart,
  VictoryTooltip,
  VictoryTheme,
  VictoryScatter,
  VictoryPie,
  VictoryLabel,
  VictoryGroup,
  VictoryVoronoiContainer,
} from 'victory-native';

const sampleData = [
  {x: 'Cats', y: 35},
  {x: 'Dogs', y: 40},
  {x: 'Birds', y: 55},
];
const PieChartVictory = () => {
  return (
    <View style={styles.container}>
      <VictoryPie
        colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
        data={sampleData}
      />
    </View>
  );
};

export default PieChartVictory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 25,
    paddingVertical: 10,
  },
});
