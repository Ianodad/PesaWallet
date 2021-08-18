import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

// component import
import Text from '../../components/Text';
import Screen from '../../components/Screen';
import {AppForm, AppFormField, SubmitButton} from '../../components/Forms';
import InputOTP from '../../components/Auth/InputOTP';
// import colors from '../config/colors';
// import { Formik } from "formik";

// default styles and configs
import defaultStyles from '../../config/styles';
import {Auth, analytics} from '../../firebase/config';

import {UPDATE_USER_PHONE_NO} from '../../graphql/mutation';
import {GET_USER_WITH_GOOGLE_ID} from '../../graphql/queries';

// actions for redux implementation
import {authActions} from '../../_actions';
const {signInWithGoogle, signOut, signInWithPhoneNumber} = authActions;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const OTPLoginScreen = ({
  navigation,
  route: {
    params: {googleId, userId},
  },
}) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     user: '',
  //     confirmations: '',
  //     userPhoneNumber: '',
  //     phoneNumberValidation: false,
  //   };
  // }

  const [user, setUser] = useState('');
  const [confirmations, setConfirmations] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [phoneNumberValidation, setPhoneNumberValidation] = useState(false);

  const [updateUser, {loading: loadingUserUpdate}] =
    useMutation(UPDATE_USER_PHONE_NO);

  const {error: userError, loading: userLoading} = useQuery(
    GET_USER_WITH_GOOGLE_ID,
    {
      variables: {id: googleId},
      onCompleted: data => setUser(data),
    },
  );

  useEffect(() => {
    // Your code here
    // GoogleSignin.configure();
    // props.signOut();
    // setUser(googleId);
  }, []);

  // componentDidMount() {
  //   // this.signOut()

  //   this.setState({user: this.props.route.params.user});
  //   console.log(this.props.route.params.user);
  // }

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required()
      .min(7, 'Phone Number is to short')
      // .matches(phoneRegExp, 'Phone number is not valid')
      .label('phoneNumber'),
  });

  const signInWithPhoneNumber = async ({phoneNumber}) => {
    const userPhoneNumberInput = `+254${phoneNumber}`;
    // console.log(phoneNumber);
    try {
      if (phoneNumber) {
        const phoneNoconfirmations = await Auth().signInWithPhoneNumber(
          userPhoneNumberInput,
        );
        // console.log(phoneNoconfirmations);
        setConfirmations(phoneNoconfirmations);
        setUserPhoneNumber(userPhoneNumberInput);
        // console.log(userPhoneNumberInput);
        setPhoneNumberValidation(true);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(confirmations);
  };

  const confirmCode = async code => {
    console.log(code);
    try {
      // await confirm.confirm(code);
      if (confirmations) {
        await confirmations.confirm(code);
        // console.log(await this.state.confirmations.confirm(code));
        setConfirmations(null);
        signInWithPhoneNumber(userPhoneNumber);
        const userID = user.allUsers[0].id;
        console.log(userID);
        const {data} = await updateUser({
          variables: {id: userID, phoneNo: userPhoneNumber},
        });
        if (data) {
          console.log(data);
          console.log('Success Code validation');
          // console.log(navigation)
          navigation.navigate('SideNavigation', {
            screen: 'Home',
            params: {screen: 'Home'},
          });
        }
      }
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  // console.log(userData?.allUsers[0]?.id);
  // console.log(googleId);
  // console.log(user);
  console.log(navigation);

  return (
    <Screen style={styles.container} Gradient>
      <View style={styles.header}>
        <Text style={styles.title}>Add Phone No</Text>
      </View>
      <View style={styles.form}>
        {!phoneNumberValidation && (
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
        )}
        {phoneNumberValidation && (
          <InputOTP confirmCode={val => confirmCode(val)} />
        )}
      </View>
    </Screen>
  );
};

const mapStateToProps = state => {
  const {authState} = state;
  console.log(authState);
  // console.log(state.gitHubApiData)
  return {
    auth: authState,
  };
};

export default connect(mapStateToProps, {
  signInWithGoogle,
  signOut,
})(OTPLoginScreen);

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
