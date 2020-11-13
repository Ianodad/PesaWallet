import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import Screen from '../components/Screen';
import * as Yup from 'yup';
import {AppForm, AppFormField, SubmitButton} from '../components/forms';
// import { Formik } from "formik";

//

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email("well that's not an email")
    .label('Email'),
  password: Yup.string()
    .required()
    .min(2, 'pretty sure this will be hacked')
    .label('Password'),
});

const LoginScreen = () => {
  return (
    <Screen style={styles.container} Gradient>
      <Text>Login Screen</Text>
      <AppForm
        initialValues={{email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}>
        <AppFormField
          icon="envelope"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
          name="email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppFormField
          icon="lock"
          name="password"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </AppForm>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: 'blue',
  },
});
