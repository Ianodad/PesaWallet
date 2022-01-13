import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {Dimensions} from 'react-native';
import {
  // LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import RangeList from './RangeList';
const screenWidth = Dimensions.get('window').width;

class LineChart extends Component {



const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  // legend: ['Rainy Days'], // optional
};
render() {
  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={screenWidth}
        height={250}
        verticalLabelRotation={10}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  )
}
}


export default LineChart
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#f5fcff',
  },
})
