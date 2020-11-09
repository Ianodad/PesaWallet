import React from 'react';
import Text from "../components/Text"
import {StyleSheet, TouchableOpacity} from 'react-native';

import colors from '../config/colors';


const AppButton = ({
  title,
  onPress,
  style,
  color = 'primary',
  fontSize = 16,
  width,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, width, {backgroundColor: colors[color]}]}
      onPress={onPress}>
      <Text style={[styles.text, fontSize]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    // width: "100%",
    // marginVertical: 10,
  },
  text: {
    color: colors.white,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
