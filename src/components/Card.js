import React from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';

import Text from './Text';
import colors from '../config/colors';
import {color} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

function commafy(num) {
  num.toString().replace(/\B(?=(?:\d{3})+)$/g, ',');
}
const Card = ({
  title,
  balance,
  logo,
  onPress,
  gradient,
  gradientColors,
  style,
}) => {
  const content = (
    <>
      <View style={styles.leftCard}>
        <View style={styles.imageHolder}>
          <Image resizeMode="contain" style={styles.image} source={logo} />
        </View>
      </View>
      <View style={styles.rightCard}>
        <View style={styles.cardDetails}>
          <View style={{flexDirection: 'row', flex:1}}>
            <Text style={styles.title}>{title}</Text>
            <View style={{marginLeft:20, flex:1}}>
            <Text style={styles.bal}>Balance</Text>
              <Text style={styles.balance}>{balance}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
  return (
    <>
      {gradient ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <LinearGradient
            start={{x: 0.25, y: 0.75}}
            end={{x: 0.75, y: 0.2}}
            style={[styles.card, style]}
            // locations={[0,0.5,0.6]}
            colors={gradientColors}>
            {content}
          </LinearGradient>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={onPress}>
          {content}
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    overflow: 'hidden',
    height: 110,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  leftCard: {
    // backgroundColor: 'white',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // overflow: 'hidden',
  },
  rightCard: {
    // backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    flex: 2,
    // overflow: 'hidden',r
  },
  cardDetails:{
    flexDirection:"row"
  },
  title: {
    // marginBottom: 5,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'gray',
    textShadowOffset: {width: 1, height: -1.3},
    textShadowRadius: 1,
  },
  imageHolder: {
    backgroundColor: 'white',
    borderRadius: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 9,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 25,
  },
  image: {
    width: 90,
    height: 90,
    padding: 1,
  },
  balance: {
    fontWeight: 'bold',
    fontSize:18,
    marginBottom: 5,
    textShadowColor: 'white',
    textShadowOffset: {width: 0.5, height: -0.5},
    textShadowRadius: 1,
  },
});

export default Card;
