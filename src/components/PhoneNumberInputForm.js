import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppForm, AppFormField, SubmitButton} from '../components/Forms';

const PhoneNumberInputForm = ({validationSchema, signInWithPhoneNumber}) => {
  return (
    <>
      <AppForm
        initialValues={{password: ''}}
        validationSchema={validationSchema}
        onSubmit={values => signInWithPhoneNumber(values)}>
        <AppFormField
          icon="mobile"
          name="phoneNumber"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Phone Number"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
        />
        <SubmitButton
          submitStyle={styles.submitButton}
          title="Submit"
          buttonColor="white"
          buttonType="contained"
        />
      </AppForm>
    </>
  );
};

export default PhoneNumberInputForm;

const styles = StyleSheet.create({
  // submitButton: {
  //   width: 900,
  //   marginTop: 20,
  //   backgroundColor: 'white',
  // },
});
