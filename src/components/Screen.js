import React from 'react';
import {Constants} from 'react-native-unimodules';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Button from './Button/Button';
// import {DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Screen = ({children, style, navigation, Gradient, menu}) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {menu && (
        <Button
          style={styles.button}
          iconStyle={styles.iconImage}
          color=""
          image={require('../assets/Menu.png')}
          onPress={() => navigation.openDrawer()}
        />
      )}

      {Gradient ? (
        <LinearGradient
          colors={['#5a60f8', '#5a60f8', '#8387f9']}
          style={styles.view}>
          {children}
        </LinearGradient>
      ) : (
        <View style={[styles.view, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    margin: 10,
    width:50,
    zIndex: 2,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
});
