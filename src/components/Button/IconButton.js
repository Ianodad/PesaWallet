import React from 'react';
import Text from '../Text';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import colors from '../../config/colors';
import Info from './Info';

const IconButton = ({
  image,
  style,
  imageStyle,
  info,
  color = 'primary',
  onPress,
}) => {
  // console.log(detail)
  return (
    <TouchableOpacity
      style={[styles.button, style, {backgroundColor: colors[color]}]}
      onPress={onPress}>
      {image && (
        <Image
          style={[styles.logo, imageStyle]}
          resizeMode="contain"
          source={image}
        />
      )}
      {info}
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
  },
  subTitle: {
    position: 'absolute',
    zIndex: 2,
  },
  info: {
    flex: 1,
    position: 'absolute',
    zIndex: 2,
  },
});
