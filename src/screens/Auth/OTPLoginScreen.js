import React, {Component} from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import Text from '../../components/Text';
import Screen from '../../components/Screen';
import * as Yup from 'yup';
import {AppForm, AppFormField, SubmitButton} from '../../components/Forms';
import InputOTP from '../../components/Auth/InputOTP';
// import colors from '../config/colors';
// import { Formik } from "formik";
import defaultStyles from '../../config/styles';
import {Auth, analytics} from '../../firebase/config';
import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

class OTPLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmations: '',
      user: '',
      phoneNumberValidation: '',
    };
  }

  componentDidMount() {
    // this.signOut()

    this.setState({user: this.props.route.params.user});
    console.log(this.props.route.params.user);
  }

  validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required()
      .min(7, 'Phone Number is to short')
      // .matches(phoneRegExp, 'Phone number is not valid')
      .label('phoneNumber'),
  });

  signInWithPhoneNumber = async ({phoneNumber}) => {
    console.log(phoneNumber);
    try {
      if (phoneNumber) {
        const confirmations = await Auth().signInWithPhoneNumber('+254724619212');
        console.log(confirmations);
        this.setState({confirmations});
        this.setState({phoneValidation: true});
      }
    } catch (error) {}
    // console.log(confirmations);
  };

  confirmCode = async (code) => {
    console.log(code);
    try {
      // await confirm.confirm(code);
      if (this.state.confirmations) {
        await this.state.confirmations.confirm(code);
        this.setState({confirmations: null});
        console.log('success');
      }
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  render() {
    const {user, phoneValidation} = this.state;
    return (
      <Screen style={styles.container} Gradient>
        <View style={styles.header}>
          <Text style={styles.title}>Add Phone No</Text>
        </View>
        <View style={styles.form}>
          {!phoneValidation && (
            <AppForm
              initialValues={{password: ''}}
              validationSchema={this.validationSchema}
              onSubmit={(values) => this.signInWithPhoneNumber(values)}>
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
          )}
          {phoneValidation && (
            <InputOTP confirmCode={(val) => this.confirmCode(val)} />
          )}
        </View>
      </Screen>
    );
  }
}

export default OTPLoginScreen;

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
    marginTop: 80,
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
