import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import defaultStyles from '../../config/styles';
import Text from '../Text';

const AppButton = ({
  title,
  onPress,
  style,
  iconStyle,
  image,
  textStyle,
  color = 'primary',
  buttonType,
  disabled,
}) => {
  // {console.log(style)}
  return (
    <>
      {buttonType ? (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
          <Neomorph
            darkShadowColor={'#00008B'}
            lightShadowColor={defaultStyles.colors.white}
            // inner
            swapShadows
            style={{
              ...style,
              ...styles.neomorphStyle,
              ...styles.button,
              backgroundColor: defaultStyles.colors[color],
            }}>
            {image && (
              <Image
                style={[styles.icon, iconStyle]}
                resizeMode="contain"
                source={image}
              />
            )}
            <Text style={[styles.text, textStyle]}>{title}</Text>
          </Neomorph>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.button,
            style,
            {backgroundColor: defaultStyles.colors[color]},
          ]}
          onPress={onPress}
          disabled={disabled}>
          {image && (
            <Image
              style={[styles.icon, iconStyle]}
              resizeMode="contain"
              source={image}
            />
          )}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    justifyContent: 'center',
    // alignItems: 'center',
    width: responsiveWidth(90),
    height: responsiveHeight(8),
  },
  text: {
    color: defaultStyles.colors.white,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  neomorphStyle: {
    borderRadius: 45,
    shadowRadius: 11,
    marginVertical: 10,
    // padding: 15,
    // backgroundColor: colors.white,
    shadowOpacity: 0.9,
    width: responsiveWidth(90),
    height: responsiveWidth(90),
    shadowOffset: {width: 1, height: 0},
  },
});
