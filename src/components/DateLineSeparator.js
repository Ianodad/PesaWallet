import React, {useEffect, useState} from 'react';
import Text from './Text';
import {StyleSheet, View} from 'react-native';
import colors from '../config/colors';
import {set} from 'lodash';
// import styles from '../config/styles';

function DateLineSeparator(date) {
  const [currentDate, setDate] = useState('');
  const [renderSeparator, setSeparator] = useState(false);
  // const {DATE} = leadingItem;
  // console.log(date)
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <Text>{date}</Text>
      <View style={styles.separator} />
    </View>
  );
  // return <View style={styles.separator} />;
}

export default DateLineSeparator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 2,
    alignItems: 'center',
  },
  separator: {
    width: '30%',
    height: 2,
    backgroundColor: colors.medium,
  },
});
