import {useFormikContext} from 'formik';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import colors from '../../config/colors';
import Button from '../Button/Button';
const {RefreshControl} = require('react-native');

const SubmitButton = ({
  title,
  submitStyle,
  buttonColor,
  width,
  buttonType,
  onPress,
}) => {
  const [textColor, setTextButton] = useState('');

  useEffect(() => {
    if (buttonColor === 'white') {
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
      buttonType={buttonType}
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
