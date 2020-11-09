import React from 'react';
import {Constants} from 'react-native-unimodules';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import IconMenu from './Button/IconMenu';
// import {DrawerActions} from '@react-navigation/native';

const Screen = ({children, style, navigation}) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {/* <IconMenu
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      /> */}
      <View style={[styles.view, style]}>{children}</View>
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
