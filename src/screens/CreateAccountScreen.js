import React from 'react';
import Text from '../components/Text';
import {StyleSheet, View} from 'react-native';
import Screen from '../components/Screen';
import {AppForm, AppFormField, SubmitButton} from '../components/forms';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required()
    .email("well that's not an email")
    .label('fullName'),
  email: Yup.string()
    .required()
    .email("well that's not an email")
    .label('Email'),
  phoneNumber: Yup.number()
    .required()
    .min(7, 'pretty sure this will be hacked')
    .label('Password'),
});

const CreateAccountScreen = () => {
  return (
    <Screen style={styles.container} Gradient>
      <Text>Register Screen</Text>
      <AppForm
        initialValues={{fullName: '', email: '', phoneNumber: ''}}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}>
         <AppFormField
          icon="user"
          name="fullName"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Fullname"
          textContentType="name"
        />
        <AppFormField
          icon="mobile"
          name="phoneNumber"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Phone Number"
          textContentType="telephoneNumber"
        />
        <AppFormField
          icon="envelope"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
          name="email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <SubmitButton title="Create Account" />
      </AppForm>
    </Screen>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
