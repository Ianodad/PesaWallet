import {Platform} from 'react-native';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import colors from './colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {getRandomInt} from '../_helpers/getRandomInt';

const widthOne = responsiveWidth(getRandomInt(20, 70));
const widthTwo = responsiveWidth(getRandomInt(55, 85));
const widthThree = responsiveWidth(getRandomInt(25, 155));
export default {
  colors,
  text: {
    color: colors.black,
    fontSize: responsiveScreenFontSize(2),
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  textSmall: {
    color: colors.black,
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  textLarge: {
    color: colors.black,
    fontSize: responsiveScreenFontSize(2.2),
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  header: {
    color: colors.black,
    fontSize: responsiveScreenFontSize(2.8),
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  headerSmall: {
    color: colors.black,
    fontSize: responsiveScreenFontSize(2.1),
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  headerLarge: {
    color: colors.black,
    fontSize: responsiveScreenFontSize(3),
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  circle: {
    position: 'absolute',
    overflow: 'hidden',
    width: widthTwo,
    height: widthTwo,
    zIndex: 1,
    borderRadius: 180 / 1,
    // backgroundColor: 'white',
    top: -100 / 3,
    right: -60,
  },
  circleTwo: {
    position: 'absolute',
    overflow: 'hidden',
    width: widthTwo,
    height: widthTwo,
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
    width: widthThree,
    height: widthThree,
    zIndex: 1,
    borderRadius: 480 / 1,
    backgroundColor: 'gray',
    top: 200 / 3,
    left: -80,
    // right: 160
  },
  triangle: {
    width: 0,
    height: 0,
    position: 'absolute',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderLeftWidth: widthOne / 2,
    borderRightWidth: widthOne / 2,
    borderBottomWidth: widthOne,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'gray',
  },
  triangleTwo: {
    width: 0,
    height: 0,
    position: 'absolute',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderLeftWidth: widthOne / 2,
    borderRightWidth: widthOne / 2,
    borderBottomWidth: widthOne,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'gray',
  },
  triangleThree: {
    width: 0,
    height: 0,
    position: 'absolute',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderLeftWidth: widthOne / 1.5,
    borderRightWidth: widthOne / 1.5,
    borderBottomWidth: widthOne,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'gray',
  },
};
