/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import defaultStyles from '../config/styles';

const RangePicker = ({range, onSetRange}) => {
  // const [selectedValue, setSelectedValue] = useState(range);
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(range);

  const [items, setItems] = useState([
    {label: 'DAY', value: 'day', hidden: true},
    {label: 'WEEK', value: 'week'},
    {label: 'MONTH', value: 'month'},
    {label: 'YEAR', value: 'year'},
    {label: 'MAX', value: 'max'},
  ]);

  const onSetValue = value => {
    // console.log(value);
    setValue(value);
    onSetRange(value);
  };
  return (
    <>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={styles.container}
        style={styles.picker}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        labelStyle={{
          // fontSize: defaultStyles.textSmall.fontSize,
          fontSize: 12,
          fontWeight: 'bold',
          textAlign: 'left',
          color: '#000',
        }}
        textStyle={{
          fontSize: 13,
        }}
        dropDownStyle={{backgroundColor: '#fafafa', fontSize: 12}}
        onChangeValue={value => onSetValue(value)}
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
