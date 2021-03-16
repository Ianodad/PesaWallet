import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
var stringify = require('fast-json-stable-stringify');
import {
  SIGN_OUT,
  SIGN_IN_WITH_GOOGLE,
  SIGN_IN_WITH_PHONE_NUMBER,
  SIGN_IN_ERROR,
  GOOGLE_VERIFICATION,
  PHONE_NO_VERIFICATION,
} from './types';

// Global regex variables

const signOut = () => async (dispatch) => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();

    dispatch({
      type: PHONE_NO_VERIFICATION,
      payload: false,
    });
    dispatch({
      type: GOOGLE_VERIFICATION,
      payload: false,
    });
    dispatch({
      type: SIGN_OUT,
      payload: null,
    });
    // this.setState({user: ''}); // Remember to remove the user from your app's state as well
    await AsyncStorage.setItem('User', '');
  } catch (error) {
    dispatch({
      type: SIGN_OUT,
      payload: null,
    });
    console.error(error);
  }
};

const signInWithGoogle = () => async (dispatch) => {
  try {
    await GoogleSignin.hasPlayServices();
    const {user} = await GoogleSignin.signIn();
    console.log(user);
    if (user) {
      await AsyncStorage.setItem('User', stringify(user));
      // await setGoogleVerification();
      dispatch({
        type: GOOGLE_VERIFICATION,
        payload: true,
      });
      dispatch({
        type: SIGN_IN_WITH_GOOGLE,
        payload: user,
      });
    }
    // this.setState({user});
    this.props.navigation.navigate('OTP', {user: user.id});
  } catch (error) {
    dispatch({
      type: SIGN_IN_ERROR,
      payload: null,
    });
    // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //   // user cancelled the login flow
    // } else if (error.code === statusCodes.IN_PROGRESS) {
    //   // operation (e.g. sign in) is in progress already
    // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //   // play services not available or outdated
    // } else {
    //   // some other error happened
    // }
  }
};

const signInWithPhoneNumber = (phoneNumber) => async (dispatch) => {

  dispatch({
    type: PHONE_NO_VERIFICATION,
    payload: true,
  });
  dispatch({
    type: SIGN_IN_WITH_PHONE_NUMBER,
    payload: phoneNumber,
  });
};

export const authActions = {
  signOut,
  signInWithGoogle,
  signInWithPhoneNumber,
};
