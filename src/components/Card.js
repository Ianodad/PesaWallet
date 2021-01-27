import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import Text from './Text';
import colors from '../config/colors';
import {color} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {commafy} from '../_helpers/Commafy';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {getRandomInt} from "../_helpers/getRandomInt";
import defaultStyles from '../config/styles';


// const oval1Width = width * 0.5,
//   oval2Width = width * 0.7;
// const getRandomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

const Card = ({
  title,
  balance,
  logo,
  onPress,
  gradient,
  gradientColors,
  style,
  width = responsiveWidth(getRandomInt(20, 70)),
  widthT = responsiveWidth(getRandomInt(55, 85)),
  widthTT = responsiveWidth(getRandomInt(25, 155)),
}) => {
  const content = (
    <>
      <LinearGradient
        start={{x: 0.25, y: 0.75}}
        end={{x: 0.75, y: 0.2}}
        style={[styles.circle, {width: width, height: width}]}
        opacity={0.2}
        colors={gradientColors}
      />
      <LinearGradient
        start={{x: 0.25, y: 0.75}}
        end={{x: 0.75, y: 0.2}}
        style={[styles.circleTwo, {width: widthT, height: widthT}]}
        opacity={0.2}
        colors={gradientColors}
      />
      <LinearGradient
        start={{x: 0.25, y: 0.75}}
        end={{x: 0.75, y: 0.2}}
        style={[styles.circleThree, {width: widthTT, height: widthTT}]}
        opacity={0.2}
        colors={gradientColors}
      />
      <View style={styles.leftCard}>
        <View style={styles.imageHolder}>
          <Image resizeMode="contain" style={styles.image} source={logo} />
        </View>
      </View>
      <View style={styles.rightCard}>
        <View style={styles.cardDetails}>
          <View style={{flexDirection: 'row', flex: 1, zIndex:3}}>
            <Text style={styles.title}>{title}</Text>
            {balance && (<View style={{marginLeft: 20, flex: 1}}>
              <Text style={styles.bal}>Balance</Text>
              <Text style={styles.balance}>{balance}</Text>
            </View>)}
          </View>
        </View>
      </View>
    </>
  );
  return (
    <>
      {gradient ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <LinearGradient
            start={{x: 0.25, y: 0.75}}
            end={{x: 0.75, y: 0.2}}
            style={[styles.card, style]}
            // locations={[0,0.5,0.6]}
            colors={gradientColors}>
            {content}
          </LinearGradient>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={onPress}>
          {content}
        </TouchableWithoutFeedback>
      )}
    </>
  );
};
const circleWidth = responsiveWidth(getRandomInt(20, 70));
const circleTwoWidth = responsiveWidth(getRandomInt(55, 85));

const circleThreeWidth = responsiveWidth(getRandomInt(25, 155));
// console.log(circle);
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    overflow: 'hidden',
    height: 110,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
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
  leftCard: {
    // backgroundColor: 'white',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // overflow: 'hidden',
  },
  rightCard: {
    // backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    flex: 2,
    // overflow: 'hidden',r
  },
  cardDetails: {
    flexDirection: 'row',
  },
  title: {
    // marginBottom: 5,
    fontSize: defaultStyles.header.fontSize,
    // fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'gray',
    textShadowOffset: {width: 1, height: -1.3},
    textShadowRadius: 1,
  },
  imageHolder: {
    backgroundColor: 'white',
    borderRadius: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 9,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 25,
  },
  image: {
    width: 90,
    height: 90,
    padding: 1,
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
});

export default Card;
