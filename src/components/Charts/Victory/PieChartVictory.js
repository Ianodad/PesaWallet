import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {VictoryPie} from 'victory-native';

import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const sampleData = [
  {x: 'Cats', y: 35},
  {x: 'Dogs', y: 40},
  {x: 'Birds', y: 55},
  {x: 'Cats', y: 35},
  {x: 'Dogs', y: 20},
  {x: 'Birds', y: 155}
];
const PieChartVictory = () => {
  return (
    <View style={styles.container}>
      <VictoryPie
      height={270}
      width={270} 
       colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
        data={sampleData}
      />
    </View>
  );
};

export default PieChartVictory;

const styles = StyleSheet.create({
  container: {
    // width: 500,
    flex: 1,
    justifyContent: 'center',
    alignItems:"center",
    marginTop: 25,
    paddingVertical: 10,
  },
});
