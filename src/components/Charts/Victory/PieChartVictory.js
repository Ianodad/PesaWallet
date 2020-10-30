import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {VictoryPie} from 'victory-native';

import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const sampleData = [
  {x: 'Cats', y: 35},
  {x: 'Dogs', y: 40},
  {x: 'Birds', y: 55},
];
const PieChartVictory = () => {
  return (
    <View style={styles.container}>
      <VictoryPie
      height={320}
      width={screenWidth} 
       colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
        data={sampleData}
      />
    </View>
  );
};

export default PieChartVictory;

const styles = StyleSheet.create({
  container: {
    width: 500,
    flex: 1,
    justifyContent: 'center',
    marginTop: 25,
    paddingVertical: 10,
  },
});
