import React from 'react';
import {StyleSheet, View} from 'react-native';
import {color} from 'react-native-reanimated';
import defaultStyles from '../../config/styles';
import Text from '../Text';

const Info = ({style, subTitle, subStyle, detail, detailStyle}) => {
  return (
    <View style={[styles.container, style]}>
      {subTitle && <Text style={[styles.subTitle, subStyle]}>{subTitle}</Text>}
      {detail && (
        <Text style={[styles.detailStyle, detailStyle]}>{detail}</Text>
      )}
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  detailStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
});
