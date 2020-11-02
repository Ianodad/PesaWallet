import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Image} from 'react-native';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import HeaderFixed from '../components/HeaderFixed';
import TitleHeader from '../components/TitleHeader';
import TransactionList from '../components/TransactionList';
import Screen from '../components/Screen';
import {LogBox} from 'react-native';
import colors from '../config/colors';

class FilteredDetailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

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
    return (
      <Screen style={styles.container}>
        <ParallaxScroll
          renderHeader={({animatedValue}) => (
            <HeaderFixed animatedValue={animatedValue} />
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
              style={styles.backgroundHeader}
              filter="filter"
              animatedValue={animatedValue}
            />
          )}
          parallaxBackgroundScrollSpeed={5}
          parallaxForegroundScrollSpeed={2.5}>
          <TransactionList navigation={this.props.navigation} />
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
    height: 180,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});
