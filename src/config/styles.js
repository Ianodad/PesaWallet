import {Platform} from 'react-native';
import {
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import colors from './colors';

export default {
  colors,
  text: {
    color: colors.black,
    fontSize: responsiveScreenFontSize(2.1),
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
};
