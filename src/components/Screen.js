import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
// import {DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import {Constants} from 'react-native-unimodules';
import {getRandomInt} from '../_helpers/getRandomInt';
import defaultStyles from '../config/styles';
import Button from './Button/Button';
import {DrawerActions} from '@react-navigation/native';

const Screen = ({
  children,
  style,
  navigation,
  Gradient,
  colors = ['#5a60f8', '#5a60f8', '#5a60f8'],
  menu,
  onLayout,
  width = responsiveWidth(getRandomInt(20, 30)),
}) => {
  return (
    <View style={[styles.screen, style]} onLayout={onLayout}>
      {menu && (
        <Button
          style={styles.button}
          iconStyle={styles.iconImage}
          color=""
          image={require('../assets/Menu.png')}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      )}

      {Gradient ? (
        <>
          <LinearGradient
            start={{x: 0.25, y: 0.75}}
            end={{x: 0.75, y: 0.2}}
            style={styles.circleTwo}
            opacity={0.2}
            colors={['#fff', '#fff', '#fff']}
          />
          <LinearGradient
            start={{x: 0.25, y: 0.75}}
            end={{x: 0.75, y: 0.2}}
            style={styles.circle}
            opacity={0.2}
            colors={['#fff', '#fff', '#fff']}
          />
          <LinearGradient
            start={{x: 0.5, y: 0.75}}
            end={{x: 0.75, y: 0.2}}
            colors={colors}
            style={styles.view}>
            {children}
          </LinearGradient>
        </>
      ) : (
        <View style={[styles.view, style]}>{children}</View>
      )}
    </View>
  );
};

export default Screen;

const circleWidth = responsiveWidth(getRandomInt(20, 55));
const circleTwoWidth = responsiveWidth(getRandomInt(30, 60));

const circleThreeWidth = responsiveWidth(getRandomInt(25, 155));

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    margin: 10,
    width: 50,
    zIndex: 2,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  circle: {
    position: 'absolute',
    overflow: 'hidden',
    // backgroundColor: 'white',
    width: circleWidth,
    height: circleWidth,
    zIndex: 1,
    borderRadius: 180 / 1,
    // backgroundColor: 'white',
    top: -100 / 3,
    right: -60,
  },
  circleTwo: {
    position: 'absolute',
    overflow: 'hidden',
    // backgroundColor: 'white',
    width: circleTwoWidth,
    height: circleTwoWidth,
    zIndex: 0.5,
    borderRadius: 180 / 1,
    // backgroundColor: 'white',
    top: 100 / 3,
    left: -100,
  },
});
