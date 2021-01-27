import React from 'react';
import Text from './Text';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import IconButton from './Button/IconButton';
import colors from '../config/colors';
import {sub} from 'react-native-reanimated';
import Info from './Button/Info';
import defaultStyles from '../config/styles';


const Type = ({image, title, amount, onSetType, selectColor}) => {
  return (
    <IconButton
      style={styles.button}
      image={image}
      imageStyle={styles.image}
      color={selectColor || title}
      onPress={onSetType}
      info={
        <Info
          style={styles.info}
          subTitle={title}
          subStyle={styles.subStyle}
          detailStyle={styles.detailStyle}
          detail={amount}
        />
      }
    />
  );
};

export default Type;

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    padding: 5,
    marginHorizontal: 5,
    shadowColor: '#FFFFFF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
  },
  info: {
    position: 'absolute',
    // color: colors.white,
    fontWeight: 'bold',
    textShadowRadius: 1,
    textShadowOffset: {width: 0, height: 1},
    textShadowColor: '#D3D3D3',
  },
  image: {
    // position: 'absolute',
    // zIndex: 1,
  },
  subStyle: {
    fontSize:defaultStyles.textSmall.fontSize,
    position: 'relative',
    fontWeight: 'bold',
    // marginBottom: 60,
  },
  detailStyle: {
    fontSize:defaultStyles.text.fontSize,
    textShadowRadius: 2,
    textShadowOffset: {width: 0, height: 1},
    textShadowColor: 'black',
  },
  info: {},
  // detail:{
  //   position:"absolute",
  //   zIndex:1
  // },
  container: {
    marginHorizontal: 5,
    flex: 1,
    height: 40,
    width: 110,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  topDetails: {
    flexDirection: 'row',
    height: 20,
  },
  topic: {
    // flex: 1,
  },
  account: {
    alignItems: 'center',
    flex: 1,
  },
  logoStyle: {
    width: 30,
    height: 30,
  },
  titleDetail: {
    paddingLeft: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
