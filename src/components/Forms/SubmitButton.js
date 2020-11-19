const {RefreshControl} = require('react-native');

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFormikContext} from 'formik';

import Button from '../Button/Button';
import colors from '../../config/colors';

const SubmitButton = ({title, submitStyle, buttonColor, width, buttonType}) => {
  const [textColor, setTextButton] = useState('');

  useEffect(() => {
    if (buttonColor == 'white') {
      setTextButton('primary');
    }
  }, [buttonColor]);

  const {handleSubmit} = useFormikContext();
  return (
    <Button
      style={styles.button}
      title={title}
      color={buttonColor}
      textStyle={styles[textColor]}
      // width={width}
      buttonType
      onPress={handleSubmit}
    />
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
  },
  primary: {
    color: colors.primary,
  },
});
