import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import Screen from '../components/Screen';
import * as Yup from 'yup';
import {AppForm, AppFormField, SubmitButton} from '../components/Forms';
import colors from '../config/colors';
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
      <View style={styles.header}>
        <Text style={styles.title}>Login Screen</Text>
      </View>
      <View style={styles.form}>
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
            shadow
          />
          <AppFormField
            icon="lock"
            name="password"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry
            textContentType="password"
            shadow
          />
          <SubmitButton
            submitStyle={styles.submitButton}
            title="Login"
            buttonColor="white"
            buttonType="contained"
          />
        </AppForm>
      </View>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // submitButton: {
  //   width: 900,
  //   marginTop: 20,
  //   backgroundColor: 'white',
  // },
  form: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
    // fontWeight: 'bold',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
