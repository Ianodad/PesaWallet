import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Button from './Button';
import colors from '../config/colors';

const data = [
  {
    id: 1,
    title: '1D',
  },
  {
    id: 2,
    title: '1W',
  },
  {
    id: 3,
    title: '1M',
  },
  {
    id: 4,
    title: '3M',
  },
  {
    id: 5,
    title: '6M',
  },
  {
    id: 6,
    title: '1Y',
  },
  {
    id: 7,
    title: 'MAX',
  },
];
const RangeList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(range) => range.id.toString()}
        renderItem={({item}) => (
          <Button style={styles.button} title={item.title} fontSize="9" />
        )}
      />
    </View>
  );
};

export default RangeList;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 20,
  },
  button: {
    marginVertical: 1,
    backgroundColor: colors.medium,
    paddingVertical: 1,
    shadowColor: '#FFFFFF',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 15,
  },
});
