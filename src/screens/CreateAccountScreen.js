import React from 'react';
import Text from '../components/Text';
import {StyleSheet, View} from 'react-native';
import Screen from '../components/Screen';
import {AppForm, AppFormField, SubmitButton} from '../components/Forms';
import * as Yup from 'yup';
import {Auth} from "../firebase/config"

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
  console.log(Auth)
  return (
    <Screen style={styles.container} Gradient>
     <View style={styles.header}>
        <Text style={styles.title}>Register Screen</Text>
      </View>
      <View style={styles.form}>
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
      </View>
    </Screen>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form:{
    flex: 1,
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
