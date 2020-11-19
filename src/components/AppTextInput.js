import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
// import {MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import defaultStyles from '../config/styles';

import {Neomorph} from 'react-native-neomorph-shadows';

const AppTextInput = ({icon, shadow, ...otherProps}) => {
  return (
    <>
      {shadow ? (
        <Neomorph
          style={styles.shadowContainer}
          // lightShadowColor={defaultStyles.colors.white}
          // darkShadowColor={defaultStyles.colors.medium}
          inner
          swapShadows>
          {icon && (
            <FontAwesome5
              name={icon}
              size={25}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          <TextInput
            // underlineColorAndroid="black"
            placeholderTextColor={defaultStyles.colors.black}
            style={defaultStyles.text}
            {...otherProps}
          />
        </Neomorph>
      ) : (
        <View style={styles.container}>
          {icon && (
            <FontAwesome5
              name={icon}
              size={25}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          <TextInput
            // underlineColorAndroid="black"
            placeholderTextColor={defaultStyles.colors.black}
            style={defaultStyles.text}
            {...otherProps}
          />
        </View>
      )}
    </>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 45,
    flexDirection: 'row',
    width: '90%',
    padding: 5,
    marginVertical: 10,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  shadowContainer: {
    flexDirection: 'row',
    shadowRadius: 10,
    borderRadius: 40,
    backgroundColor: '#DDDDDD',
    width: 350,
    height: 55,
    padding: 5,
    marginVertical: 10,
  },
});
