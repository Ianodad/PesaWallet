import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const Settings = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Settings')}
        title="Settings"
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
