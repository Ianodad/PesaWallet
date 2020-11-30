import React from 'react';
import Text from './Text';
import {StyleSheet, View} from 'react-native';
import IconButton from './Button/IconButton';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const SwipeAction = ({setNextData, setPrevData, title}) => {
  return (
    <View style={styles.container}>
      <IconButton
        onPress={setPrevData}
        style={styles.button}
        iconStyle={styles.icon}
        color=""
        icon={'angle-left'}
        iconSize={30}
      />
      <Text style={styles.title}>{title}</Text>
      <IconButton
        onPress={setNextData}
        iconStyle={styles.icon}
        color=""
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
    width: responsiveWidth(40),
  },
  button: {
    // width: 40,
  },
  icon: {
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 3,
    shadowRadius: 3,

    elevation: 3,
  },
  title: {
    marginHorizontal: 10,
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: 'blue',
    textShadowOffset: {width: -1, height: 0},
    textShadowRadius: 1,
    // color: 'white',
    // width: responsiveWidth(20)
  },
  icon: {
    width: 16,
    color: 'white',
  },
});
