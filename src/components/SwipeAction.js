import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import defaultStyles from '../config/styles';
import IconButton from './Button/IconButton';
import Text from './Text';

const SwipeAction = ({setNextData, setPrevData, title}) => {
  return (
    <View style={styles.container}>
      <IconButton
        onPress={setNextData}
        style={styles.button}
        iconStyle={styles.icon}
        color=""
        icon={'angle-left'}
        iconSize={30}
      />
      <Text style={styles.title}>{title}</Text>
      <IconButton
        onPress={setPrevData}
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
    fontSize: defaultStyles.textSmall.fontSize,
    // fontSize: 18,
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
