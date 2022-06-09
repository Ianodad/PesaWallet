import {useMutation, useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

// component import
import {authActions} from '../../_actions';
import InputOTP from '../../components/Auth/InputOTP';
import PhoneNumberInput from '../../components/Auth/PhoneNumberInput';
import PhoneNumberInputForm from '../../components/Auth/PhoneNumberInputForm';
import {AppForm, AppFormField, SubmitButton} from '../../components/Forms';
import Screen from '../../components/Screen';
import Text from '../../components/Text';
// import colors from '../config/colors';
// import { Formik } from "formik";

// default styles and configs
import defaultStyles from '../../config/styles';
import {Auth, analytics} from '../../firebase/config';

import {UPDATE_USER_PHONE_NO} from '../../graphql/mutation';
import {GET_USER_WITH_GOOGLE_ID} from '../../graphql/queries';

// actions for redux implementation
const {signInWithGoogle, signOut, OTPPhoneNumberVerified} = authActions;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const OTPLoginScreen = ({
  navigation,
  // eslint-disable-next-line no-shadow
  OTPPhoneNumberVerified,
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
    changeNumber;
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

  const changeNumber = () => {
    setConfirmations('');
    setUserPhoneNumber('');
    setPhoneNumberValidation(false);
  };

  const signInWithPhoneNumber = async phoneNumber => {
    console.log(phoneNumber);
    // const userPhoneNumberInput = `+254${phoneNumber}`;
    // // console.log(phoneNumber);
    try {
      if (phoneNumber) {
        const phoneNoconfirmations = await Auth().signInWithPhoneNumber(
          phoneNumber,
        );
        // console.log(phoneNoconfirmations);
        setConfirmations(phoneNoconfirmations);
        setUserPhoneNumber(phoneNumber);
        // console.log(userPhoneNumberInput);
        setPhoneNumberValidation(true);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(confirmations);
  };

  const  confirmCode = async code => {
    console.log(confirmations);
    try {
      // await confirm.confirm(code);
      if (confirmations) {
        await confirmations.confirm(code);
        // console.log(data);

        // With backend
        await OTPPhoneNumberVerified(userPhoneNumber);
        console.log('Success Code validation');
        await navigation.navigate('SideNavigation', {
          screen: 'HomeMain',
          params: {screen: 'HomeBottom'},
        });
        // console.log(await this.state.confirmations.confirm(code));
        // setConfirmations(null);
        // const userID = user.allUsers[0].id;
        // update backend with number
        // const {data} = await updateUser({
        //   variables: {id: userID, phoneNo: userPhoneNumber},
        // });
        // if (data) {
        //   OTPPhoneNumberVerified(userPhoneNumber);
        //   console.log('Success Code validation');
        //   // console.log(navigation)
        //   navigation.navigate('SideNavigation', {
        //     screen: 'HomeMain',
        //     params: {screen: 'HomeBottom'},
        //   });
        // }
      }
    } catch (error) {
      console.log(error);
      setConfirmations('');

      // console.log('Invalid code.');
      alert('Invalid code click on change number to retry');
    }
  };

  // console.log(userData?.allUsers[0]?.id);
  // console.log(googleId);
  // console.log(user);
  // console.log(navigation);

  return (
    <Screen style={styles.container} Gradient>
      <View style={styles.header}>
        {!phoneNumberValidation && (
          <Text style={styles.title}>Add Phone No</Text>
        )}
        {phoneNumberValidation && (
          <>
            <Text style={styles.title}>Verification Code</Text>
            <Text>Please type the verification code sent to:</Text>
            <Text>{userPhoneNumber}</Text>
          </>
        )}
      </View>
      <View style={styles.form}>
        {!phoneNumberValidation && (
          // <PhoneNumberInputForm
          //   validationSchema={validationSchema}
          //   signInWithPhoneNumber={signInWithPhoneNumber}
          // />
          <PhoneNumberInput onHandleSubmit={signInWithPhoneNumber} />
        )}
        {phoneNumberValidation && (
          <InputOTP
            confirmCode={val => confirmCode(val)}
            clearOTP={() => setConfirmations('')}
            onChangeNumber={changeNumber}
            phoneNumber={userPhoneNumber}
          />
        )}
      </View>
    </Screen>
  );
};

const mapStateToProps = state => {
  const {authState} = state;
  // console.log(authState);
  // console.log(state.gitHubApiData)
  return {
    auth: authState,
  };
};

export default connect(mapStateToProps, {
  OTPPhoneNumberVerified,
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
