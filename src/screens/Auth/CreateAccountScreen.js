import React, {Component} from 'react';
import Text from '../../components/Text';
import {StyleSheet, View} from 'react-native';
import Screen from '../../components/Screen';
import {AppForm, AppFormField, SubmitButton} from '../../components/Forms';
import * as Yup from 'yup';
import {Auth, firebase, firestore} from '../../firebase/config';

class CreateAccountScreen extends Component {
  // constructor(props) {
  //   this.state = {};
  // }
  // subType = ['basic', 'premium', 'professional']

  validationSchema = Yup.object().shape({
    fullName: Yup.string().required().min(3).label('fullName'),
    email: Yup.string()
      .required()
      .email("well that's not an email")
      .label('Email'),
    phoneNumber: Yup.number()
      .required()
      .min(7, 'Number to short')
      .label('phoneNumber'),
    // .test('unique-no', 'this phone number is already taken', (value) => {
    //   if (value.toString() === '1234556') {
    //     return true;
    //   }
    // }),
    password: Yup.string()
      .required()
      .min(2, 'pretty sure this will be hacked')
      .label('Password'),
  });

  checkIfPhoneNoDoesNotExist = async value => {
    // const userRef = await firestore()
    //   .collection('users')
    //   .where('phoneNumber', '==', value.toString())
    //   .get();
    // try {
    //   const querySnapshot = userRef.docs;
    //   console.log(querySnapshot);
    //   if (querySnapshot) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } catch (err) {
    //   console.log(err.message);
    //   return err;
    // }
    // return await firestore()
    //   .collection('users')
    //   .where('phoneNumber', '==', value.toString())
    //   .get()
    //   .then((querySnapshot) => {
    //     // console.log(querySnapshot)
    //     if (!querySnapshot.empty) {
    //       // console.log(querySnapshot.docs[0].data())
    //       const user = querySnapshot.docs[0].data();
    //       return false;
    //       // rest of your code
    //     } else {
    //       return true;
    //     }
    //   });
    // } catch (err) {
    //   console.log(err.message);
    //   return false;
    // }
    // const userRef = firestore()
    //   .collection('user')
    //   .where('phoneNumber', '==', `${value}`);
    // const q = '' || value;
    // try {
    //   //
    //   await userRef.get().then((querySnapshot) => {
    //     console.log(`${value}`);
    //     console.log(querySnapshot._docs[0].data);
    //     console.log('User exists: ', querySnapshot._exists);
    //     if (querySnapshot.exists) {
    //       console.log('User data: ', querySnapshot._data);
    //     }
    //   });
    // } catch (e) {
    //   console.log('this err');
    // }
  };

  handleCreateUser = async ({email, password, fullName, phoneNumber}) => {
    console.log(email, password);
    const userRef = await firestore();
    userRef
      .collection('users')
      .where('phoneNumber', '==', phoneNumber.toString())
      .get()
      .then(querySnapshot => {
        // console.log(querySnapshot)
        if (querySnapshot.docs[0].data()) {
          Alert.alert('username is taken');
          //       return userData;
          console.log('phone exits');
          // console.log(querySnapshot.docs[0].data())
          return querySnapshot.docs[0].data();
          // rest of your code
        } else {
          Auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
              // console.log(user);
              // console.log(firebase.auth().currentUser);
              console.log('User account created & signed in!');
              if (user) {
                firestore().collection('users').doc(user.uid).set({
                  name: fullName,
                  email: email,
                  phoneNumber: phoneNumber,
                  subscription: 'basic',
                });
              }
              // this.props.navigation.navigate('HomeScreen');
            });
          return true;
        }
      });

    Auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        // console.log(user);
        // console.log(firebase.auth().currentUser);
        console.log('User account created & signed in!');
        if (user) {
          firestore().collection('users').doc(user.uid).set({
            name: fullName,
            email: email,
            phoneNumber: phoneNumber,
            subscription: 'basic',
          });
        }
        // this.props.navigation.navigate('HomeScreen');
      });
    //   .catch((error) => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }

    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }

    //     console.error(error);
    //   });

    //     rootRef
    //   .child('users')
    //   .orderByChild('username')
    //   .equalTo(username)
    //   .once('value')
    //   .then(snapshot => {
    //     if (snapshot.exists()) {
    //       let userData = snapshot.val();
    //       console.log(userData);
    //       Alert.alert('username is taken');
    //       return userData;
    //     } else {
    //       console.log('not found');
    //       firebase
    //         .auth()
    //         .createUserWithEmailAndPassword(email, password)
    //         .then(async user => {
    //           console.log('Data created', user);
    //         });
    //     }
    // });
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
            onSubmit={values => this.handleCreateUser(values)}>
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
