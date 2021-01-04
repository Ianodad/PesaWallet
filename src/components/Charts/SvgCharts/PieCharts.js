/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
var _ = require('lodash');

import colors from '../../../config/colors';

class PieCharts extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedSlice: {
        label: '',
        value: 0,
      },
      labelWidth: 0,
    };
  }

  componentDidMount() {
    console.log(this.props);
    const label = this.props.selectedType ? this.props.selectedType : 'All'
    this.setState({selectedSlice: {label: label}});
  }
  setData = (datas, label) => {
    var result = _.chain(datas)
      .groupBy('TYPE')
      .map((objs, key) => {
        const value = _.sumBy(_.filter(objs, {TYPE: key}), 'AMOUNT');
        return {
          key,
          value,
          svg: {fill: colors[key]},
          arc: {
            outerRadius: label === key ? 110 + '%' : '100%',
            padAngle: label === key ? 0.1 : 0,
          },
          onPress: () => this.setState({selectedSlice: {label: key, value}}),
        };
      })
      .value();

    return result;
  };

  componentDidUpdate(prevProps) {
    if (!(this.props.selectedType === prevProps.selectedType)) {
      const label = this.props.selectedType ? this.props.selectedType : 'All'
      const value = _.sumBy( this.props.datas, 'AMOUNT');
      // console.log(value)
      this.setState({selectedSlice: {label, value}});
    }
  }

  render() {
    const {labelWidth, selectedSlice} = this.state;
    const {orientation, datas, range, selectedType} = this.props;

    const {label, value} = selectedSlice;

    const data = this.setData(datas, label);
    const deviceWidth = Dimensions.get('window').width;
    // console.log(selectedSlice.label);
    // console.log(selectedType);
    return (
      <View style={[styles.container, {marginTop: orientation ? responsiveHeight(24) : responsiveHeight(10)}]}>
        <PieChart
          style={{height: orientation ? responsiveHeight(42) : responsiveHeight(90) }}
          outerRadius={'80%'}
          innerRadius={'45%'}
          data={data}
        />
        <Text
          onLayout={({
            nativeEvent: {
              layout: {width},
            },
          }) => {
            this.setState({labelWidth: width});
          }}
          style={{
            position: 'absolute',
            left: deviceWidth / 2 - labelWidth / 2,
            textAlign: 'center',
            color: 'white',
          }}>
          {`${label} \n ${value}`}
        </Text>
      </View>
    );
  }
}

export default PieCharts;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
});
