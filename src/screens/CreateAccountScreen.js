import React, {Component} from 'react';
import Text from '../components/Text';
import {StyleSheet, View} from 'react-native';
import Screen from '../components/Screen';
import {AppForm, AppFormField, SubmitButton} from '../components/Forms';
import * as Yup from 'yup';
import {Auth, analytics} from '../firebase/config';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required().label('fullName'),
  email: Yup.string()
    .required()
    .email("well that's not an email")
    .label('Email'),
  phoneNumber: Yup.number()
    .required()
    .min(7, 'pretty sure this will be hacked')
    .label('PhoneNumber'),
  password: Yup.string()
    .required()
    .min(2, 'pretty sure this will be hacked')
    .label('Password'),
});

class CreateAccountScreen extends Component {
  componentDidMount = async () => {
    // await analytics().setCurrentScreen("screen_name", "screen_name");
    // analytics().setUser('8');
    // analytics().setUserProperties({})
    // console.log("hello")
    // console.log(analytics());
  };

  // handleAnalytics = (id, typebuton) => {
  //   console.log(id, typebuton);
  //   // console.log('hello');
  //   // await analytics().logEvent('createSubmitButton', {
  //   //   // id: id,
  //   //   item: typebuton,
  //   //   // description: ['round neck', 'long sleeved'],
  //   //   // size: 'L',
  //   // });
  // };

  handleCreateUser = async ({email, password}) => {
    console.log(email, password);

    Auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        this.props.navigation.navigate('Home');
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
