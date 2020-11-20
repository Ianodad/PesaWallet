import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Screen from '../components/Screen';
import TypeList from '../components/TypeList';
import TransactionList from '../components/TransactionList';
import VisualChart from '../components/VisualChart';
import RangePicker from '../components/RangePicker';

import color from '../config/colors';

import {messages} from '../services/messagesCollection';
import {typesData} from '../services/typeData';
class SourceDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      types: [],
      selectedType: 'Receive',
      selectedRange: '',
      selectDate: '',
    };
  }

  componentDidMount() {
    this.setState({fullData: messages});
    this.setState({types: typesData});
  }

  render() {
    const {navigation, route} = this.props;
    const {fullData, types, selectedType} = this.state;

    const filter = fullData.filter((data) => data.TYPE == selectedType);
    // console.log(filter);

    return (
      <Screen navigation={navigation} style={styles.screen} menu>
        <View style={{alignItems:"flex-end"}}>
        <RangePicker data={types} />
        </View>
        <LinearGradient
          start={{x: 0, y: 0.8}}
          end={{x: 0.5, y: 0.1}}
          style={styles.header}
          colors={['#8387f9', '#5a60f8']}>
          <VisualChart />
        </LinearGradient>
        <View style={styles.body}>
          <TypeList data={types} />
          <TransactionList
            flatList={true}
            navigation={navigation}
            data={filter}
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
