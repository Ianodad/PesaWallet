import React from 'react';

import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {NumberCommas} from '../_helpers/NumberCommas';
import {getRandomInt} from '../_helpers/getRandomInt';

import defaultStyles from '../config/styles';

import Text from './Text';

const ProviderCard = ({
  title,
  balance,
  logo,
  onPress,
  shape,
  gradientColors,
  accountNo,
  width = responsiveWidth(getRandomInt(20, 70)),
  widthT = responsiveWidth(getRandomInt(55, 85)),
  widthTT = responsiveWidth(getRandomInt(25, 155)),
}) => {
  const content = (
    <>
      <LinearGradient
        start={{x: 0.25, y: 0.75}}
        end={{x: 0.75, y: 0.2}}
        style={[defaultStyles.circle, {width: width, height: width}]}
        opacity={0.2}
        colors={gradientColors}
      />
      <LinearGradient
        start={{x: 0.25, y: 0.75}}
        end={{x: 0.75, y: 0.2}}
        style={[defaultStyles.circleTwo, {width: widthT, height: widthT}]}
        opacity={0.2}
        colors={gradientColors}
      />
      <LinearGradient
        start={{x: 0.25, y: 0.75}}
        end={{x: 0.75, y: 0.2}}
        style={[defaultStyles.circleThree, {width: widthTT, height: widthTT}]}
        opacity={0.2}
        colors={gradientColors}
      />
      <View style={styles.leftCard}>
        <View style={styles.leftCardTop}>
          <Text style={styles.h3}>Vendor Name</Text>
          <Text style={{...styles.title, ...styles.h1}}>{title}</Text>
        </View>
        <View style={styles.leftCardBottom}>
          <Text style={styles.h3}>Balance</Text>
          <Text style={styles.balance}>{`KSH ${NumberCommas(balance)}`}</Text>
        </View>
      </View>
      <View style={styles.rightCard}>
        <View style={styles.rightCardBottom}>
          <Text style={styles.h3}>Account/ Tel No</Text>
          <Text style={{...styles.title, ...styles.h1}}>{accountNo}</Text>
        </View>
        <View style={styles.rightCardTop}>
          <Text style={{...styles.h3}}>Settings</Text>
        </View>
      </View>
    </>
  );
  return (
    <>
      <TouchableWithoutFeedback onPress={onPress} style={styles.container}>
        {/* <AnimatedLinearGradient
          customColors={presetColors.instagram}
          speed={10000}
        /> */}
        <LinearGradient
          start={{x: 0.25, y: 0.75}}
          end={{x: 0.75, y: 0.2}}
          style={[styles.container]}
          // locations={[0,0.5,0.6]}
          colors={gradientColors}>
          {content}
        </LinearGradient>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 0.2,
    flexDirection: 'row',
    overflow: 'hidden',
    height: responsiveHeight(27.7),
    borderRadius: 25,
    padding: 10,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: '#39b54b',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 20,
  },
  title: {
    color: defaultStyles.colors.white,
  },
  h1: {
    fontSize: responsiveHeight(2.5),
    fontWeight: 'bold',
    color: 'white',
  },
  h3: {
    fontSize: responsiveHeight(1.5),
    color: defaultStyles.colors.offWhite,
    fontWeight: '200',
  },
  leftCard: {
    // backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // overflow: 'hidden',
  },
  leftCardTop: {
    flex: 1,
  },
  leftCardBottom: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  rightCard: {
    // backgroundColor: colors.primary,
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 20,
    flex: 1,
    // overflow: 'hidden',r
  },
  rightCardTop: {
    flex: 1,
  },
  rightCardBottom: {
    flex: 1,
  },
  balance: {
    fontWeight: 'bold',
    fontSize: defaultStyles.text.fontSize,
    color: defaultStyles.colors.white,
    // fontSize: 18,
    marginBottom: 5,
    textShadowColor: 'white',
    textShadowOffset: {width: 0.5, height: -0.5},
    textShadowRadius: 1,
  },
});

export default ProviderCard;
