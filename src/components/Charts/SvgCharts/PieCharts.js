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
    // console.log(props);
    this.state = {
      selectedSlice: {
        label: '',
        value: 0,
      },
      labelWidth: 0,
    };
  }

  componentDidMount = async() => {
    // console.log(this.props);
    const label = this.props.selectedType ? this.props.selectedType : 'All'
    // // console.log(this.datas)
    const value = await _.sumBy( this.props.datas, 'AMOUNT');
    this.setState({selectedSlice: {label: label, value}});
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
  
  // componentWillUpdate = async (nextProps, nextState)=>{
  //   if (nextProps.selectedType !== this.props.selectedType){
  //     // const label = nextProps.selectedType ? nextProps.selectedType : 'All'
  //     // const value = await _.sumBy( nextProps.datas, 'AMOUNT');
  //     console.log(value)
  //     // console.log(label)
  //     // console.log(nextProps.datas)
  //     this.setState({selectedSlice: {label, value:0}});
  //   }
  //   // console.log(this.props.selectedType)
  //   // console.log(nextProps.selectedType)
  //   // console.log(nextProps.datas)
  // }
  // shouldComponentUpdate (nextProps) {
  //   // console.log(nextProps.selectedType)
  //    return nextProps !== this.props
  // }

  componentDidUpdate = async(prevProps, prevState)=> {
    if ((this.props.selectedType !== prevProps.selectedType)) {
      // const label = this.props.selectedType ? this.props.selectedType : 'All'
      // console.log(label)
      // const value = label != "All" ? await _.sumBy(_.filter(this.props.datas, {TYPE: label}), 'AMOUNT') : await _.sumBy( this.props.datas, 'AMOUNT');
      console.log(value)
      // console.log(this.props.datas)
      this.setState({selectedSlice: {label, value:0}});
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
