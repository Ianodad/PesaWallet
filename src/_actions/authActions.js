/* eslint-disable prettier/prettier */
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';var stringify = require('fast-json-stable-stringify');
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

const signInWithGoogle = (user) => async (dispatch) => {

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

const signInError = (error) => async (dispatch) => {

  dispatch({
    type:   SIGN_IN_ERROR,
    payload: error,
  });
}

export const authActions = {
  signOut,
  signInError,
  signInWithGoogle,
  signInWithPhoneNumber,
};
