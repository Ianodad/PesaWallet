/* eslint-disable no-undef */
import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Image} from 'react-native';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import HeaderFixed from '../components/HeaderFixed';
import TitleHeader from '../components/TitleHeader';
import TransactionList from '../components/TransactionList';
import {messages, getMessages} from '../services/messagesCollection';
import Screen from '../components/Screen';
import {LogBox} from 'react-native';
import colors from '../config/colors';

var _ = require('lodash');


class FilteredDetailsScreen extends Component {
  constructor(props) {
    super(props);
    // console.log(props.route.params);
    this.state = {
      data: [],
      id: props.route.params.id || '',
      title: props.route.params.title || '',
      phoneNo: props.route.params.phoneNo || '',
    };
  }

  componentDidMount() {
    this.setState({data: getMessages(this.state.id)});
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  getFinance = (data) => {
    const credit = _.filter(data, {FINANCE: 'Credit'}).map((t) => t.AMOUNT)
    const creditSum = _.sum(credit)
    const creditLength = _.size(credit)
    const debit = _.filter(data, {FINANCE: 'Debit'}).map((t) => t.AMOUNT)
    const debitSum = _.sum(debit)
    const debitLength = _.size(debit)
    // // console.log(debitSum, creditSum)
    // console.log(credit, debit)
    // console.log(creditLength, debitLength)
    return {creditSum, creditLength, debitSum, debitLength}
  };
  renderHeader() {
    return (
      <View style={styles.backgroundHeader}>
        <Text>Hello This is Ian</Text>
      </View>
    );
  }
  foreBackground() {
    return (
      <View style={styles.foreGroundHeader}>
        <TitleHeader />
      </View>
    );
  }

  render() {
    const {navigation, route} = this.props;
    const {data, title, phoneNo} = this.state;
    const {creditSum, creditLength, debitSum, debitLength} = this.getFinance(data)

    return (
      <Screen navigation={navigation} style={styles.container} menu>
        <ParallaxScroll
          renderHeader={({animatedValue}) => (
            <HeaderFixed title={title} animatedValue={animatedValue} />
          )}
          // onChangeHeaderVisibility={this.renderHeader}
          headerHeight={70}
          isHeaderFixed={true}
          parallaxHeight={180}
          // useNativeDriver={true}
          headerFixedTransformY={10}
          fadeOutParallaxBackground={true}
          isBackgroundScalable={true}
          // nested
          headerFixedBackgroundColor={colors.primary}
          // renderParallaxBackground={this.renderBackground}
          renderParallaxForeground={({animatedValue}) => (
            <TitleHeader
              title={title}
              phoneNo={phoneNo}
              debitSum={debitSum}
              creditSum={creditSum}
              debitLength={debitLength}
              creditLength={creditLength}
              style={styles.backgroundHeader}
              filter="filter"
              animatedValue={animatedValue}
            />
          )}
          parallaxBackgroundScrollSpeed={5}
          parallaxForegroundScrollSpeed={4.5}>
          <TransactionList
            sectionList={true}
            navigation={navigation}
            data={data}
          />
        </ParallaxScroll>
      </Screen>
    );
  }
}
export default FilteredDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  backgroundContainer: {
    backgroundColor: colors.primary,
  },
  backgroundHeader: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  foreGroundHeader: {
    // height: 180,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});