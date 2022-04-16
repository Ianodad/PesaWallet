import {StyleSheet, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import Text from '../components/Text';
const MessageDetailScreen = ({navigation}) => {
  return (
    <Screen navigation={navigation} style={styles.container} menu>
      <Text>MessageDetailScreen</Text>
    </Screen>
  );
};

export default MessageDetailScreen;

const styles = StyleSheet.create({});
