import React from 'react';
import {StyleSheet, View} from 'react-native';

import Text from './Text';
const HeaderFixed = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Joe Dancan</Text>
      {/* <Text> Ian Adera</Text> */}
    </View>
  );
};

export default HeaderFixed;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignItems: 'center',
    fontSize: 24,
  },
});
