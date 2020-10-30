import React from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';

import Text from './Text';
import colors from '../config/colors';
import {color} from 'react-native-reanimated';

const Card = ({title, balance, logo, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.leftCard}>
          <Image resizeMode="contain" style={styles.image} source={logo} />
        </View>
        <View style={styles.rightCard}>
          <View style={styles.cardDetails}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.balance}>{balance}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 110,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 1,
  },
  leftCard: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // overflow: 'hidden',
  },
  rightCard: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    flex: 2,
    // overflow: 'hidden',r
  },
  image: {
    width: 70,
  },
  title: {
    marginBottom: 5,
    fontSize: 24,
  },
  balance: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Card;
