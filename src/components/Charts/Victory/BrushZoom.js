import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  VictoryLine,
  VictoryChart,
  VictoryTooltip,
  VictoryTheme,
  VictoryScatter,
  VictoryLabel,
  VictoryGroup,
  VictoryVoronoiContainer,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryAxis
} from 'victory-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

class LineChart extends Component {
    constructor() {
    super();
    this.state = {};
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart
          width={responsiveWidth(105)}
          padding={80}
          // width={550}
          // height={300}
          scale={{x: 'time'}}
          containerComponent={
            <VictoryZoomContainer
              responsive={false}
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }>
          <VictoryLine
            style={{
              data: {stroke: 'tomato'},
            }}
            data={[
              {x: new Date(1982, 1, 1), y: 125},
              {x: new Date(1987, 1, 1), y: 257},
              {x: new Date(1993, 1, 1), y: 345},
              {x: new Date(1997, 1, 1), y: 515},
              {x: new Date(2001, 1, 1), y: 132},
              {x: new Date(2005, 1, 1), y: 305},
              {x: new Date(2011, 1, 1), y: 270},
              {x: new Date(2015, 1, 1), y: 470},
            ]}
          />
        </VictoryChart>

        <VictoryChart
          width={550}
          height={90}
          scale={{x: 'time'}}
          padding={{top: 0, left: 50, right: 50, bottom: 30}}
          containerComponent={
            <VictoryBrushContainer
              responsive={false}
              brushDimension="x"
              brushDomain={this.state.selectedDomain}
              onBrushDomainChange={this.handleBrush.bind(this)}
            />
          }>
          <VictoryAxis
            tickValues={[
              new Date(1985, 1, 1),
              new Date(1990, 1, 1),
              new Date(1995, 1, 1),
              new Date(2000, 1, 1),
              new Date(2005, 1, 1),
              new Date(2010, 1, 1),
              new Date(2015, 1, 1),
            ]}
            tickFormat={(x) => new Date(x).getFullYear()}
          />
          <VictoryLine
            style={{
              data: {stroke: 'tomato'},
            }}
            data={[
              {x: new Date(1982, 1, 1), y: 125},
              {x: new Date(1987, 1, 1), y: 257},
              {x: new Date(1993, 1, 1), y: 345},
              {x: new Date(1997, 1, 1), y: 515},
              {x: new Date(2001, 1, 1), y: 132},
              {x: new Date(2005, 1, 1), y: 305},
              {x: new Date(2011, 1, 1), y: 270},
              {x: new Date(2015, 1, 1), y: 470},
            ]}
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 25,
    // alignItems: 'center',
    // backgroundColor: '#f5fcff',
  },
});

export default LineChart;
