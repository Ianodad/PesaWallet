import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import LinearGradient from 'react-native-linear-gradient';
import Screen from '../components/Screen';
import TypeList from '../components/TypeList';
import TransactionList from '../components/TransactionList';
import VisualChart from '../components/VisualChart';
import RangePicker from '../components/RangerPicker';
import SwipeAction from '../components/SwipeAction';

import color from '../config/colors';

import {DateFilter} from '../_helpers/DateFilter.js';
import {NumberCommas} from '../_helpers/NumberCommas';

import {messages} from '../services/messagesCollection';
import {typesData} from '../services/typeData';
import defaultStyles from '../config/styles';


var _ = require('lodash');

class SourceDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      types: [],
      setDataIndex: 0,
      dataIndexLength: '',
      selectedType: '',
      selectColor: '',
      selectedDate: '',
      selectedRange: 'year',
      typeColors: ['#5a60f8', '#5a60f8', '#8387f9'],
    };
  }

  componentDidMount() {
    this.setState({fullData: messages});
    this.setState({types: typesData});
  }

  setType = (selectedType, typeColors) => {
    this.setState({selectedType});
    this.setState({typeColors});
    this.setState({selectColor: 'white'});
  };

  setRange = (selectedRange) => {
    this.setState({selectedRange});
    this.setState({setDataIndex: 0});
  };

  filterMessages = (data, range, type) => {
    if (type) {
      if (range == 'max') {
        const filter = _.filter(data, {TYPE: type});

        return {fullFiltered: filter, filter, datalength: 0, title: 'Max'};
      } else {
        const intialfilter = DateFilter(data, range);
        let datalength = intialfilter.length;
        const filter = _.get(intialfilter, `[${this.state.setDataIndex}].data`);
        const title = _.get(intialfilter, `[${this.state.setDataIndex}].title`);
        console.log(title);
        // console.log(filter);
        const fullFiltered = _.filter(filter, {TYPE: type});
        // console.log(datalength);
        // console.log(filtered);
        return {fullFiltered, filter, datalength, title};
      }
    } else {
      if (range === 'max') {
        return {fullFiltered: data, filter: data, datalength: 0, title: 'Max'};
      } else {
        const intialfilter = DateFilter(data, range);
        let datalength = intialfilter.length;

        const filter = _.get(intialfilter, `[${this.state.setDataIndex}].data`);
        const title = _.get(intialfilter, `[${this.state.setDataIndex}].title`);
        console.log(title);
        // const dataFilter = _.get(data, `[${this.state.setDataIndex}].data`);
        // this.setState({dataIndexLength: intialfilter.length});
        return {fullFiltered: filter, filter, datalength, title};
      }
    }
  };

  getGraphData = (data) => {
    return _.map(data, function (f) {
      if (f.FINANCE == 'Debit') {
        return -f.AMOUNT;
      } else {
        return f.AMOUNT;
      }
    });
    // return _.map(data, 'AMOUNT');
  };

  filterType = (data) => {
    let typesSummed = _(data)
      .groupBy('TYPE')
      .map((objs, key) => {
        return {
          TYPE: key,
          AMOUNT: _.sumBy(objs, 'AMOUNT'),
        };
      })
      .value();
    return typesSummed;
    // console.log(summed);
  };

  getSummedTotal = (data, title) => {
    const summed = _.filter(data, {TYPE: title}).map((t) => t.AMOUNT);
    // console.log(summed.length);
    if (!summed[0]) {
      return undefined;
    } else {
      return NumberCommas(summed[0]);
    }
  };
  onSwipe(gestureName, gestureState) {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }
  onSetNextData = (datalength) => {
    // console.log(datalength);
    if (this.state.setDataIndex < datalength - 1) {
      console.log(this.state.setDataIndex + 1);
      this.setState({setDataIndex: this.state.setDataIndex + 1});
    }
  };

  onSetPrevData = () => {
    if (!this.state.setDataIndex - 1 < 0) {
      console.log(this.state.setDataIndex - 1);
      this.setState({setDataIndex: this.state.setDataIndex - 1});
    }
  };

  render() {
    const {navigation, route} = this.props;
    const {
      fullData,
      types,
      selectedRange,
      selectedType,
      typeColors,
    } = this.state;

    const {fullFiltered, filter, datalength, title} = this.filterMessages(
      fullData,
      selectedRange,
      selectedType,
    );

    // console.log(fullFiltered);
    const graphData = this.getGraphData(fullFiltered);
    const typesSummed = this.filterType(filter);

    // console.log(fullFiltered)
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

    return (
      <Screen navigation={navigation} style={styles.screen} menu>
        <View style={styles.action}>
          <SwipeAction
            title={title}
            style={styles.swipeaction}
            setNextData={() => this.onSetNextData(datalength)}
            setPrevData={() => this.onSetPrevData()}
          />
        </View>
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
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeRight={() => this.onSetNextData(datalength)}
            onSwipeLeft={() => this.onSetPrevData()}
            config={config}
            style={{flex: 1}}>
            <VisualChart
              data={graphData ? graphData : fullData}
              colors={typeColors}
            />
          </GestureRecognizer>
        </LinearGradient>
        <View style={styles.body}>
          <TypeList
            data={types}
            typesSummed={typesSummed}
            selectColor={this.selectColor}
            onSetType={this.setType}
            onGetSummedTotal={this.getSummedTotal}
          />
          <TransactionList
            header
            flatList={true}
            header={true}
            navigation={navigation}
            title={selectedType || 'All'}
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
  swipeaction: {},
  action: {
    alignItems: 'center',
    marginRight: 50,
  },
});
