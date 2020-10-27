import React from 'react';
import Text from './Text';
import {StyleSheet, View} from 'react-native';
import IconButton from './IconButton';
import colors from '../config/colors';

const Type = ({image, title}) => {
  return (
    <View style={styles.container}>
      <IconButton style={styles.button} image={image} logoStyle={styles.logoStyle} color="red" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Type;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
  },
  button: {
    marginVertical: 5,
    paddingVertical: 5,
    marginHorizontal: 5,
    width: 70,
    height: 70,
  },
  logoStyle:{
    width:50
  },
  title: {
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
