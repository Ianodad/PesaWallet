import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const IconMenu = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.menu}
        resizeMode="contain"
        source={require('../../assets/Menu.png')}
      />
    </TouchableOpacity>
  );
};

export default IconMenu;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    position: 'absolute',
    flex: 1,
    zIndex: 2,
    
  },
  menu: {
    width: 30,
    height: 30,
  },
});
