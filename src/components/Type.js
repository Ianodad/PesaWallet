import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IconButton from './IconButton';
import colors from '../config/colors';

const Type = ({image, title}) => {
  return (
    <View style={styles.container}>
      <IconButton style={styles.button} image={image} />
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
    backgroundColor: colors.medium,
    paddingVertical: 5,
    marginHorizontal: 5,
    width: 70,
    height: 70,
  },
  title: {
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
