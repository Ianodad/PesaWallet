import React from 'react';
import {StyleSheet, View} from 'react-native';

import Text from './Text';
const TitleName = () => {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Text>Ian Adera</Text>
    </View>
  );
};

export default TitleName;

const styles = StyleSheet.create({
  container: {
    
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',

}
});
