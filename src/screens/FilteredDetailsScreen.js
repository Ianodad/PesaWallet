/* eslint-disable react/prop-types */
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
import {LogBox} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
import {storeMessages} from '../_actions/index';
import {nameTitleCase} from '../_helpers/NameTitleCase';

import HeaderFixed from '../components/HeaderFixed';
import Screen from '../components/Screen';
import TitleHeader from '../components/TitleHeader';
import Transaction from '../components/Transaction';
import TransactionList from '../components/TransactionList';

import colors from '../config/colors';
import defaultStyles from '../config/styles';

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

  getMessages = (messages, id) => {
    console.log('messages', messages);
    // console.log(id)
    // console.log(_.filter(messages, (message) => message.PHONENO == id || message.NAME == id.toUpperCase()));
    return _.filter(
      messages,
      message => message?.PHONENO == id || nameTitleCase(message?.NAME) == id,
    );
    // return messages.filter((message) => message);
  };

  componentDidMount() {
    const messages = this.props.collection[this.props.providerType];
    console.assert('this.props.collection', this.props);
    this.setState({
      data:
        this.props.route.params.data ||
        this.getMessages(messages, this.state.id),
    });
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  getFinance = data => {
    const credit = _.filter(data, {FINANCE: 'Credit'}).map(t => t.AMOUNT);
    const creditSum = _.sum(credit);
    const creditLength = _.size(credit);
    const debit = _.filter(data, {FINANCE: 'Debit'}).map(t => t.AMOUNT);
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
    const {
      navigation,
      route,
      onScroll = () => {
        console.log('try');
      },
    } = this.props;
    const {data, title, phoneNo} = this.state;
    const {creditSum, creditLength, debitSum, debitLength} =
      this.getFinance(data);

    return (
      <Screen navigation={navigation} style={styles.container} menu>
        <ParallaxScrollView
          style={{flex: 1, backgroundColor: 'hotpink', overflow: 'hidden'}}
          onScroll={onScroll}
          headerBackgroundColor={defaultStyles.colors.offWhite}
          backgroundColor={defaultStyles.colors.primary}
          contentBackgroundColor="white"
          stickyHeaderHeight={responsiveHeight(8)}
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
              color="primary"
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
          )}>
          <TransactionList
            header={false}
            sectionList={true}
            navigation={navigation}
            data={data}
          />
        </ParallaxScrollView>
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
const mapStateToProps = state => {
  const {SmsCollected} = state;
  return {
    collection: SmsCollected.collection,
    providerType: SmsCollected.providerType,
  };
};
const mapDispatchToProps = {storeMessages};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilteredDetailsScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.primary,
  },
  stickyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: defaultStyles.colors.offWhite,
  },
  header: {
    flex: 1,
    marginLeft: 60,
    marginTop: 30,
    backgroundColor: defaultStyles.colors.offWhite,
  },
  stickyTitle: {
    fontSize: 36,
    marginVertical: 30,
  },
  background: {
    height: 400,
    backgroundColor: defaultStyles.colors.offWhite,
  },
});
