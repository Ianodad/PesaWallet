import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Screen from '../components/Screen';
import TypeList from '../components/TypeList';
import TransactionList from '../components/TransactionList';
import VisualChart from '../components/VisualChart';
import RangePicker from '../components/RangePicker';

import color from '../config/colors';

import {DateFilter} from '../_helpers/DateFilter.js';
import {messages} from '../services/messagesCollection';
import {typesData} from '../services/typeData';

var _ = require('lodash');

class SourceDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      filtered: [],
      types: [],
      selectedType: 'Receive',
      selectedRange: 'month',
      selectedDate: '',
    };
  }

  componentDidMount() {
    this.setState({fullData: messages});
    this.setState({types: typesData});
    // this.filterMessages(
    //   this.state.fullData,
    //   this.state.selectedRange,
    //   this.state.selectedType,
    // );
  }

  setType = (selectedType) => {
    this.setState({selectedType});
    // this.filterMessages(
    //   this.state.fullData,
    //   this.state.selectedRange,
    //   this.state.selectedType,
    // );
  };

  setRange = (selectedRange) => {
    this.setState({selectedRange});
    // this.filterMessages(
    //   this.state.fullData,
    //   this.state.selectedRange,
    //   this.state.selectedType,
    // );
  };

  filterMessages = (data, range, type) => {
    // let query = {
    //   range: this.state.selectedRange,
    //   type: this.state.selectedType,
    // };
    const filter = DateFilter(data, range);
    // console.log(filter);
    const filtered = _.filter(filter, {TYPE: type});
    // console.log(filtered);
    this.setState({filtered});
  };

  render() {
    const {navigation, route} = this.props;
    const {filtered, fullData, types, selectedRange, selectedType} = this.state;
    // this.filterMessages(fullData, selectedRange, selectedType);
    console.log(selectedRange);
    const filter = DateFilter(fullData, selectedRange);

    // console.log(filter);
    const fullFiltered = _.filter(filter, {TYPE: selectedType});
    // console.log(fullData)
    // const filter = selectedType
    // ? fullData.filter((data) => data.TYPE == selectedType)
    // : fullData;
    // console.log(filter);

    return (
      <Screen navigation={navigation} style={styles.screen} menu>
        <View style={{alignItems: 'flex-end', marginRight: 10}}>
          <RangePicker
            data={types}
            range={selectedRange}
            onSetRange={this.setRange}
          />
        </View>
        <LinearGradient
          start={{x: 0, y: 0.8}}
          end={{x: 0.5, y: 0.1}}
          style={styles.header}
          colors={['#8387f9', '#5a60f8']}>
          <VisualChart data={fullFiltered ? fullFiltered : fullData} />
        </LinearGradient>
        <View style={styles.body}>
          <TypeList data={types} onSetType={this.setType} />
          <TransactionList
            flatList={true}
            navigation={navigation}
            data={fullFiltered ? fullFiltered : fullData}
          />
        </View>
      </Screen>
    );
  }
}

export default SourceDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: color.white,
  },
  header: {
    backgroundColor: color.primary,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    flex: 4,
  },
  body: {
    backgroundColor: color.white,
    flex: 5,
    flexDirection: 'column',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});
