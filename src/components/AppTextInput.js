import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
// import {MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import defaultStyles from '../config/styles';

const AppTextInput = ({icon, ...otherProps}) => {
  return (
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
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 15,
    flexDirection: 'row',
    width: '100%',
    padding: 5,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    // height:20
  },
});
