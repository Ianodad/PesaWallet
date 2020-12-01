import React from 'react';
import {StyleSheet, View} from 'react-native';

import Text from './Text';
const HeaderFixed = ({style, textStyle, title}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </View>
  );
};

export default HeaderFixed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
    fontSize: 24,
    color: 'white',
  },
});
