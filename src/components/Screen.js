import React from 'react';
import {Constants} from 'react-native-unimodules';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import IconMenu from "./Button/IconMenu";

const Screen = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <IconMenu/>
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
