import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

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
const RangePicker = () => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <View style={styles.container}>
      <RNPickerSelect
        style={styles.picker}
        value={selectedValue}
        onValueChange={(value) => setSelectedValue(value)}
        items={[
          {label: '1DAY', value: 'DAY'},
          {label: '1WEEK', value: 'WEEK'},
          {label: '1MONTH', value: 'MONTH'},
          {label: '1YEAR', value: 'YEAR'},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    position: 'absolute',
    margin: 10,
    zIndex: 2,
  },
});

export default RangePicker;
