import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const leftIcon = <Icon name="angle-left" size={30} color="#900" />
const myIcon2 = <Icon name="c" size={30} color="#900" solid />;
const rightIcon = <Icon name="angle-right" size={30} color="#900" light />; 


const SwipeAction = () => {
  return (
    <View style={styles.container}>
      <Text>{leftIcon} </Text>
      <Text>Oct 1 - Oct 7</Text>
      <Text>{rightIcon}</Text>
    </View>
  );
};

export default SwipeAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 4,
    position: 'absolute',
    // alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
});
