import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Orientation from 'react-native-orientation';

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

import {storeMessages} from '../_actions/index';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      orientation: '',
      collectionFiltered:[],
      typesSummed:0
      // filter: [],
      // datalength:'',
      // title:''
    };

    // let filtered, initialFilter, datalength, title;
  }

  // componentWillMount() {
  //   const initial = Orientation.getInitialOrientation();
  //   this.setState({orientation: initial});
  // }
  
  componentDidMount = async () => {
    // console.log(this.props.collection)
    // this.filterMessages(this.props.collection, this.state.)
    // const fullData = JSON.parse(this.props.collection)
    await this.loadCollection()

    // console.log(this.fullData)
    // this.setState({fullData: this.props.collection});
    this.setState({types: typesData});
    const initial = Orientation.getInitialOrientation();
    this.setState({orientation: initial});
    Orientation.addOrientationListener(this._orientationDidChange);
  };

  componentDidUpdate = async(prevProps, prevState) => {
    if (prevState.selectedType !== this.state.selectedType || prevState.selectedRange !== this.state.selectedRange ||  prevState.setDataIndex !== this.state.setDataIndex || this.state.typeColors !== this.state.typeColors ) {
    console.log('collectionFiltered state has changed.')

    this.filterCollection(this.state.fullData, this.state.selectedRange, this.state.selectedType, this.state.setDataIndex);

  }

  }
  // componentWillUpdate = async(nextProps, nextState)=> {
  //   if (nextState.selectedType != this.state.selectedType || nextState.selectedRange != this.state.selectedRange || nextState.setDataIndex != this.state.setDataIndex || nextState.typeColors != this.state.typeColors ){
  //     // console.log(nextState.selectedType)
  //     // console.log(this.state.selectedType)
  //     this.filterCollection(nextState.fullData, nextState.selectedRange, nextState.selectedType, nextState.setDataIndex);

  //   }

  // }

  
  loadCollection = async () => {
    try {
      const collection = await AsyncStorage.getItem('COLLECTION');
      if (collection !== null) {
        // We have data!!
        // console.log('this here');
        const data = JSON.parse(collection);
        
        // console.log(data)
        // const typesSummed = await this.filterType(data);
        // console.log(typesSummed)
        this.setState({fullData: data})
        await this.filterCollection(data, this.state.selectedRange, this.state.selectedType, this.state.setDataIndex);

        
        // console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  filterCollection = (data, range, type, setDataIndex) => {
    if (type) {
      if (range=='max'){
        const collectionFiltered =  _.filter(data, {TYPE: type})
        const typesSummed = this.filterType(collectionFiltered);
        this.setState({collectionFiltered, datalength: 0, title: 'Max', typesSummed})
      } else {
        const intialfilter = DateFilter(data, range);
        let datalength = intialfilter.length;
        const filter =  _.get(intialfilter, `[${datalength -setDataIndex-1}].data`);
        const title =  _.get(intialfilter, `[${datalength - setDataIndex-1}].name`);
        const collectionFiltered = _.filter(filter, {TYPE: type});
        const typesSummed =  this.filterType(collectionFiltered);
        this.setState({collectionFiltered, datalength, title, typesSummed})
      }
    } else {
      if (range === "max"){
          const typesSummed =  this.filterType(data);
          this.setState({collectionFiltered: data, datalength: 0, title: 'Max', typesSummed})
      } else {
        const intialfilter = DateFilter(data, range);                  
        let datalength = intialfilter.length;
        const collectionFiltered = _.get(intialfilter, `[${datalength-setDataIndex-1}].data`);
        const title = _.get(intialfilter, `[${datalength-setDataIndex-1}].name`);
        const typesSummed =  this.filterType(collectionFiltered);
        this.setState({collectionFiltered, datalength, title, typesSummed})
      }
    }
  }

  _orientationDidChange = (orientation) => {
    // console.log(orientation);
    this.setState({orientation: orientation});
  };
  
  componentWillUnmount = () => {
    Orientation.getOrientation((err, orientation) => {
      // console.log(`Current Device Orientation: ${orientation}`);
    });
    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  };

  setType = (selectedType, typeColors) => {
    // const {
    //   fullData,
    //   selectedRange,
    // } = this.state;
    this.setState({selectedType});
    this.setState({typeColors});
    this.setState({selectColor: 'white'});
    this.setState({setDataIndex: 0});
    // this.filterCollection(this.state.fulldata, this.state.selectedRange, selectedType, this.state.setDataIndex);
    // this.filterCollection(fullData,  selectedRange, selectedType)
  };

  setRange = (selectedRange) => {
    this.setState({selectedRange});
    this.setState({selectedType: ''});
    this.setState({setDataIndex: 0});
    // this.filterCollection(this.state.fullData, selectedRange, this.state.selectedType, this.state.setDataIndex);

  };

  // filterMessages = async (data, range, type) => {
  //   // console.log(type)
  //   if (type) {
  //     if (range == 'max') {
  //       const filter = _.filter(data, {TYPE: type});

  //       return {fullFiltered: filter, filter, datalength: 0, title: 'Max'};
  //     } else {
  //       // console.log(data)
  //       const intialfilter = await DateFilter(data, range);
  //       let datalength = intialfilter.length;
  //       const filter = _.get(intialfilter, `[${this.state.setDataIndex}].data`);
  //       const title = _.get(intialfilter, `[${this.state.setDataIndex}].title`);
  //       // console.log(title);
  //       // console.log(filter);
  //       const fullFiltered = _.filter(filter, {TYPE: type});
  //       // console.log(datalength);
  //       // console.log(fullFiltered);
  //       return {fullFiltered, filter, datalength, title};
  //     }
  //   } else {
  //     // console.log(data)
  //     if (range === 'max') {
  //       return {fullFiltered: data, filter: data, datalength: 0, title: 'Max'};
  //     } else {
  //       const intialfilter = await DateFilter(data, range);
  //       // console.log(intialfilter[0].data)
  //       let datalength = intialfilter.length;

  //       const fullFiltered = await _.get(intialfilter, `[${this.state.setDataIndex}].data`);
  //       // console.log(this.state.setDataIndex)
  //       const title = _.get(intialfilter, `[${this.state.setDataIndex}].title`);
  //       // console.log(title);
  //       // const dataFilter = _.get(data, `[${this.state.setDataIndex}].data`);
  //       // console.log(fullFiltered)
  //       // console.log(title)
  //       // console.log(datalength)

  //       return {fullFiltered, fullFiltered, datalength, title};
  //     }
  //   }
  // };

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
      return undefined
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
      // console.log(this.state.setDataIndex + 1);
      this.setState({setDataIndex: this.state.setDataIndex + 1});
      // this.filterCollection(this.state.fullData, this.state.selectedRange, this.state.selectedType, this.state.setDataIndex+1);
    }
  };

  onSetPrevData = () => {
    if (!this.state.setDataIndex - 1 < 0) {
      // console.log(this.state.setDataIndex - 1);
      this.setState({setDataIndex: this.state.setDataIndex - 1});
      // this.filterCollection(this.state.fullData, this.state.selectedRange, this.state.selectedType, this.state.setDataIndex-1);
    }
  };

  onLayout = (e) => {
    console.log('Screen orientation changed....');
    // console.log(this.state.orientation);
    const initial = Orientation.getInitialOrientation();
    // console.log(initial);
    this.setState({orientation: initial});
  };

  render() {
    const {navigation, route} = this.props;
    // console.log(navigation.setOptions({ tabBarVisible: false }));
    // navigation.setOptions()
    const {
      fullData,
      types,
      selectedRange,
      selectedType,
      typeColors,
      orientation,
      collectionFiltered,
      datalength,
      title,
      typesSummed
    } = this.state;

    // const {fullFiltered, filter, datalength, title} = this.filterMessages(
    //   fullData,
    //   selectedRange,
    //   selectedType,
    // );

    // console.log(fullFiltered);
    // console.log(filter)
    // console.log(datalength)
    // console.log(title)
    // const graphData = this.getGraphData(fullFiltered);
    // const typesSummed = this.filterType(collectionFiltered);

    // console.log("type color", typeColors)
    // console.log("Selected type", selectedType )
    // console.log(typesSummed)
    // console.log(fullFiltered)
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

    const portraitOrientation = orientation === 'PORTRAIT';
    // console.log(selectedType)
    // if (!fullFiltered) return (<><Text> There are no products on display </Text></>);
    return (
      <Screen
        navigation={navigation}
        style={styles.screen}
        // onLayout={this.onLayout}
        menu>
        { portraitOrientation ? (
          <>
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
                onSwipeRight={() => this.onSetPrevData() }
                onSwipeLeft={() => this.onSetNextData(datalength) }
                config={config}
                style={{flex: 1}}>
                <VisualChart
                  orientation={portraitOrientation}
                  height={200}
                  range={selectedRange}
                  selectedType={selectedType}
                  data={collectionFiltered}
                  // data={graphData ? graphData : fullData}
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
                data={collectionFiltered ? collectionFiltered : fullData}
              />
            </View>
          </>
        ) : (
          <>
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
              style={[styles.header]}
              colors={['#8387f9', '#5a60f8']}>
              <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                onSwipeRight={() => this.onSetNextData(datalength)}
                onSwipeLeft={() => this.onSetPrevData()}
                config={config}
                style={[{flex: 1}, styles.landscape]}>
                <VisualChart
                  orientation={portraitOrientation}
                  height={305}
                  data={collectionFiltered}
                  selectedType={selectedType}
                  // data={graphData ? graphData : fullData}
                  colors={typeColors}
                />
              </GestureRecognizer>
            </LinearGradient>
          </>
        )}
      </Screen>
    );
  }
}
const mapStateToProps = (state) => {
  const {SmsCollected} = state;
  return {
    collection: SmsCollected.collection,
  };
}
const mapDispatchToProps = {storeMessages};

export default connect(mapStateToProps, mapDispatchToProps)(SourceDetailsScreen);

// export default SourceDetailsScreen;

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
  action: {
    alignItems: 'center',
    marginRight: 50,
  },
  landscape: {
    flex: 1,
    // marginTop:40,
    flexGrow: 1,
    // flexDirection: 'column',
    // alignItems: 'flex-end',
    // justifyContent: 'flex-start',
    // marginBottom: -10,
  },
});
