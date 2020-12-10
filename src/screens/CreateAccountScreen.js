import React, {Component} from 'react';
import Text from '../components/Text';
import {StyleSheet, View} from 'react-native';
import Screen from '../components/Screen';
import {AppForm, AppFormField, SubmitButton} from '../components/Forms';
import * as Yup from 'yup';
import {Auth, firebase} from '../firebase/config';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required()
    .min(3)
    .label('fullName'),
  email: Yup.string()
    .required()
    .email("well that's not an email")
    .label('Email'),
  // phoneNumber: Yup.number()
  //   .required()
  //   .min(7, 'pretty sure this will be hacked')
  //   .label('Password'),
  password: Yup.string()
    .required()
    .min(2, 'pretty sure this will be hacked')
    .label('Password'),
});
class CreateAccountScreen extends Component {
  // constructor(props) {
  //   this.state = {};
  // }

  handleCreateUser = async ({email, password, fullName}) => {
    console.log(email, password);

    Auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(firebase.auth().currentUser);
        console.log('User account created & signed in!');
        // if (user) {
        //   user
        //     .updateProfile({
        //       displayName: fullName, // some displayName,
        //     })
        //     .then(
        //       (s) => console.log(s), // perform any other operation
        //     );
        // }
        // this.props.navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });

    // try {
    //   let response = await auth().createUserWithEmailAndPassword(
    //     email,
    //     password,
    //   );
    //   if (response) {
    //     console.log(tag, '?', response);
    //   }
    // } catch (e) {
    //   console.error(e.message);
    // }
  };

  render() {
    return (
      <Screen style={styles.container} Gradient>
        <View style={styles.header}>
          <Text style={styles.title}>Register Screen</Text>
        </View>
        <View style={styles.form}>
          <AppForm
            initialValues={{email: '', password: '', fullName: ''}}
            validationSchema={this.validationSchema}
            onSubmit={(values) => this.handleCreateUser(values)}>
            <AppFormField
              icon="user"
              name="fullName"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Fullname"
              textContentType="name"
            />
            {/* <AppFormField
              icon="mobile"
              name="phoneNumber"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Phone Number"
              textContentType="telephoneNumber"
            />  */}
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
              shadow
            />
            <SubmitButton title="Create Account" />
          </AppForm>
        </View>
      </Screen>
    );
  }
}

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
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
