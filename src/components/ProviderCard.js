import React from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import AnimatedLinearGradient, {
  presetColors,
} from 'react-native-animated-linear-gradient';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {getRandomInt} from '../_helpers/getRandomInt';
import defaultStyles from '../config/styles';

import Text from './Text';


const ProviderCard = ({
  title,
  balance,
  logo,
  onPress,
  width = responsiveWidth(getRandomInt(20, 70)),
  widthT = responsiveWidth(getRandomInt(55, 85)),
  widthTT = responsiveWidth(getRandomInt(25, 155)),
}) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={onPress} style={styles.container}>
        {/* <AnimatedLinearGradient
          customColors={presetColors.instagram}
          speed={10000}
        /> */}
        <View style={styles.container}>
          <View style={styles.leftCard}>
            <View style={styles.leftCardTop}>
              <Text style={styles.h3}>Vendor Name</Text>
              <Text style={{...styles.title, ...styles.h1}}>{title}</Text>
            </View>
            <View style={styles.leftCardBottom}>
              <Text style={styles.h3}>Balance</Text>
              <Text style={styles.balance}>{`KSH ${balance}`}</Text>
            </View>
          </View>
          <View style={styles.rightCard}>
            <View style={styles.rightCardBottom}>
              <Text style={styles.h3}>Account/ Tel No</Text>
              <Text style={{...styles.title, ...styles.h1}}>0712XXXX98</Text>
            </View>
            <View style={styles.rightCardTop}>
              <Text style={{...styles.h3}}>Settings</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const circleWidth = responsiveWidth(getRandomInt(20, 70));
const circleTwoWidth = responsiveWidth(getRandomInt(55, 85));
const circleThreeWidth = responsiveWidth(getRandomInt(25, 155));

const styles = StyleSheet.create({
  container: {
    // flex: 0.2,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 210,
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
    color: '#fff',
  },
  h1: {
    fontSize: responsiveHeight(2.5),
    fontWeight: 'bold',
  },
  h3: {
    fontSize: responsiveHeight(1.5),
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
    // fontSize: 18,
    marginBottom: 5,
    textShadowColor: 'white',
    textShadowOffset: {width: 0.5, height: -0.5},
    textShadowRadius: 1,
  },
  circle: {
    position: 'absolute',
    overflow: 'hidden',
    // width: circleWidth,
    // height: circleWidth,
    zIndex: 1,
    borderRadius: 180 / 1,
    // backgroundColor: 'white',
    top: -100 / 3,
    right: -60,
  },
  circleTwo: {
    position: 'absolute',
    overflow: 'hidden',
    width: circleTwoWidth,
    height: circleTwoWidth,
    zIndex: 1,
    borderRadius: 190 / 1,
    backgroundColor: 'white',
    top: -600 / 3,
    left: 70,
    // right: 160
  },
  circleThree: {
    position: 'absolute',
    overflow: 'hidden',
    width: circleThreeWidth,
    height: circleThreeWidth,
    zIndex: 1,
    borderRadius: 480 / 1,
    backgroundColor: 'gray',
    top: 200 / 3,
    left: -80,
    // right: 160
  },
});

export default ProviderCard;
