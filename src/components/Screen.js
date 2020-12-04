import React from 'react';
import {Constants} from 'react-native-unimodules';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Button from './Button/Button';
// import {DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {getRandomInt} from "../_helpers/getRandomInt"
import defaultStyles from '../config/styles';


const Screen = ({
  children,
  style,
  navigation,
  Gradient,
  colors = ['#5a60f8', '#5a60f8', '#5a60f8'],
  menu,
  width = responsiveWidth(getRandomInt(20, 30)),
}) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {menu && (
        <Button
          style={styles.button}
          iconStyle={styles.iconImage}
          color=""
          image={require('../assets/Menu.png')}
          onPress={() => navigation.openDrawer()}
        />
      )}

      {Gradient ? (
        <>
          <LinearGradient
            start={{x: 0.25, y: 0.75}}
            end={{x: 0.75, y: 0.2}}
            style={[styles.circle, {width: width, height: width}]}
            opacity={0.2}
            colors={colors}
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
    </SafeAreaView>
  );
};

export default Screen;

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
    // width: circleWidth,
    // height: circleWidth,
    zIndex: 1,
    borderRadius: 180 / 1,
    // backgroundColor: 'white',
    top: -100 / 3,
    right: -60,
  },
});
