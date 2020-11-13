import React from 'react';
import {Constants} from 'react-native-unimodules';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import IconMenu from './Button/IconMenu';
// import {DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Screen = ({children, style, navigation, Gradient}) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {/* <IconMenu
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      /> */}
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
});
