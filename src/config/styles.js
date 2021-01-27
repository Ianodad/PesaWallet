import {Platform} from 'react-native';
import {
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import colors from './colors';

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
  textLarge:{
    color: colors.black,
    fontSize: responsiveScreenFontSize(2.2),
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  }, 
  header :{
    color: colors.black,
    fontSize: responsiveScreenFontSize(2.8),
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir'
  },
  headerSmall :{
    color: colors.black,
    fontSize: responsiveScreenFontSize(2.1),
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir'
  },
  headerLarge :{
    color: colors.black,
    fontSize: responsiveScreenFontSize(3),
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir'
  }
};
