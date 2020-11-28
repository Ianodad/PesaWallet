import React from 'react';
import Text from './Text'
import {StyleSheet, View} from 'react-native';
import IconButton from './Button/IconButton';

const SwipeAction = ({setNextData, setPrevData, title}) => {
  return (
    <View style={styles.container}>
      <IconButton
        onPress={setPrevData}
        style={styles.button}
        iconStyle={styles.icon}
        color=""
        icon={'angle-left'}
        iconSize={20}
      />
      <Text>{title}</Text>
      <IconButton
        onPress={setNextData}
        iconStyle={styles.icon}
        color=''
        icon={'angle-right'}
        iconSize={30}
      />
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
    // justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    width: 200,
  },
  button: {
    // width: 40,
  },
  icon: {
    width: 16,
    color: 'white',
  },
});
