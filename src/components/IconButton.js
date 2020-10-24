import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import colors from '../config/colors';

const IconButton = ({image, style, color = 'primary', onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, {backgroundColor: colors[color]}]}
      onPress={onPress}>
      <Image style={styles.logo} resizeMode="contain" source={image} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    width: 50,
    height: 50,
  },
});
