const {RefreshControl} = require('react-native');

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFormikContext} from 'formik';

import Button from '../Button/Button';

const SubmitButton = ({title}) => {
  const {handleSubmit} = useFormikContext();
  return <Button title={title} onPress={handleSubmit} />;
};

export default SubmitButton;

const styles = StyleSheet.create({});
