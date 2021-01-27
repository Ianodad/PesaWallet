/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import defaultStyles from '../config/styles';


const RangePicker = ({range, onSetRange}) => {
  const [selectedValue, setSelectedValue] = useState(range);

  // console.log(selectedValue);
  const setValue = (value) => {
    setSelectedValue(value);
    onSetRange(value);
  };
  return (
    <>
      <DropDownPicker
        items={[
          {label: 'DAY', value: 'day', hidden: true},
          {label: 'WEEK', value: 'week'},
          {label: 'MONTH', value: 'month'},
          {label: 'YEAR', value: 'year'},
          {label: 'MAX', value: 'max'},
        ]}
        defaultValue={selectedValue}
        containerStyle={styles.container}
        style={styles.picker}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        labelStyle={{
          // fontSize: defaultStyles.textSmall.fontSize,
          fontSize: 14,
          fontWeight: 'bold',
          textAlign: 'left',
          color: '#000',
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={(item) => setValue(item.value)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
  },
  picker: {
    // alignItems: 'flex-end',
    backgroundColor: '#fafafa',
    marginTop: 13,
    height: 35,
    width: 100,
    zIndex: 2,
    position: 'absolute',
  },
});

export default RangePicker;