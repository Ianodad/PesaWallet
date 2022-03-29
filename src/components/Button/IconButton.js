import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import colors from '../../config/colors';
import defaultStyles from '../../config/styles';
// import Text from '../Text';
// import Info from './Info';

const IconButton = ({
  image,
  style,
  imageStyle,
  info,
  iconStyle,
  icon,
  iconSize,
  color = 'primary',
  onPress,
}) => {
  // console.log(detail)
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {backgroundColor: defaultStyles.colors[color]},
      ]}
      onPress={onPress}>
      {icon && (
        <Icon style={[styles.icon, iconStyle]} name={icon} size={iconSize} />
      )}

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
