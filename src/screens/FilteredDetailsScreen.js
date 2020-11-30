/* eslint-disable no-undef */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  PixelRatio,
} from 'react-native';
// import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Transaction from '../components/Transaction';
import {nameTitleCase} from '../_helpers/NameTitleCase';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

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
      dataSource: [
        'Simplicity Matters',
        'Hammock Driven Development',
        'Value of Values',
        'Are We There Yet?',
        'The Language of the System',
        'Design, Composition, and Performance',
        'Clojure core.async',
        'The Functional Database',
        'Deconstructing the Database',
        'Hammock Driven Development',
        'Value of Values',
      ],
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.route.params.data || getMessages(this.state.id),
    });
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  getFinance = (data) => {
    const credit = _.filter(data, {FINANCE: 'Credit'}).map((t) => t.AMOUNT);
    const creditSum = _.sum(credit);
    const creditLength = _.size(credit);
    const debit = _.filter(data, {FINANCE: 'Debit'}).map((t) => t.AMOUNT);
    const debitSum = _.sum(debit);
    const debitLength = _.size(debit);
    // // console.log(debitSum, creditSum)
    // console.log(credit, debit)
    // console.log(creditLength, debitLength)
    return {creditSum, creditLength, debitSum, debitLength};
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
    const {navigation, route, onScroll = () => {}} = this.props;
    const {data, title, phoneNo} = this.state;
    const {creditSum, creditLength, debitSum, debitLength} = this.getFinance(
      data,
    );

    return (
      <Screen navigation={navigation} style={styles.container} menu>
        <FlatList
          data={data}
          keyExtractor={(type) => type.ID.toString()}
          renderItem={({item}) => (
            <Transaction
              style={styles.transaction}
              id={item.ID}
              phoneNo={item.PHONENO}
              type={item.TYPE}
              name={nameTitleCase(item.NAME)}
              date={item.DATE}
              time={item.TIME}
              cost={item.COST}
              amount={item.AMOUNT}
              finance={item.FINANCE}
              navigation={navigation}
            />
          )}
          renderScrollComponent={(props) => (
            <ParallaxScrollView
              style={{flex: 1, backgroundColor: 'hotpink', overflow: 'hidden'}}
              onScroll={onScroll}
              headerBackgroundColor={colors.white}
              backgroundColor={colors.primary}
              contentBackgroundColor="white"
              stickyHeaderHeight={responsiveHeight(10)}
              parallaxHeaderHeight={responsiveHeight(25)}
              backgroundSpeed={10}
              renderBackground={() => <View style={styles.background} />}
              renderForeground={() => (
                <TitleHeader
                  title={title}
                  phoneNo={phoneNo}
                  debitSum={debitSum}
                  creditSum={creditSum}
                  debitLength={debitLength}
                  creditLength={creditLength}
                  style={styles.backgroundHeader}
                  filter="filter"
                />
              )}
              renderStickyHeader={() => (
                <View style={styles.header}>
                  <HeaderFixed
                    style={styles.stickyHeader}
                    textStyle={styles.stickyTitle}
                    title={title}
                  />
                </View>
              )}
            />
          )}
        />
        {/* <ParallaxScroll
          renderHeader={({animatedValue}) => (
            <HeaderFixed title={title} animatedValue={animatedValue} />
          )}
          // onChangeHeaderVisibility={this.renderHeader}
          // headerHeight={70}
          isHeaderFixed
          headerHeight={70}
          parallaxHeight={180}
          // useNativeDriver={true}
          headerFixedTransformY={10}
          fadeOutParallaxBackground={true}
          isBackgroundScalable={true}
          // nested
          headerFixedBackgroundColor={'transparent'}
          // headerFixedBackgroundColor={colors.primary}
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
          parallaxForegroundScrollSpeed={2}>
          <TransactionList
            sectionList={true}
            navigation={navigation}
            data={data}
          />
        </ParallaxScroll> */}
      </Screen>
    );
  }
}

export default FilteredDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  stickyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
  },
  header: {
    flex: 1,
    marginLeft: 60,
    marginTop: 40,
    backgroundColor: colors.white,
  },
  stickyTitle: {
    fontSize: 36,
    marginVertical: 30,
  },
  background: {
    height: 400,
    backgroundColor: colors.white,
  },
});
