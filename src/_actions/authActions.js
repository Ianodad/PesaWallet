/* eslint-disable prettier/prettier */
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
var stringify = require('fast-json-stable-stringify');
import {
  SIGN_OUT,
  SET_INITIAL_USER_STATE,
  SIGN_IN_WITH_GOOGLE,
  SIGN_IN_WITH_PHONE_NUMBER,
  SIGN_IN_ERROR,
  GOOGLE_VERIFICATION,
  PHONE_NO_VERIFICATION,
  USER_VERIFIED,
} from './types';

// Global regex variables


const setInitialState = (data) =>async (dispatch)=>{
  try {
    if (data !== null) {
      console.log('setInitialState', data);
      dispatch({
        type: SET_INITIAL_USER_STATE,
        payload: data,
      });
    }

    dispatch({
      type: SET_INITIAL_USER_STATE,
      payload: null,
    });
  } catch (e) {
    console.log(e);
    // error reading value
  }
};

const signOut = (navigation, CommonActions) => async (dispatch) => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();

    await AsyncStorage.setItem('User', '');
    await AsyncStorage.setItem('localUserDetails', '');

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
    dispatch({
      type: USER_VERIFIED,
      payload: false,
    });
    // this.setState({user: ''}); // Remember to remove the user from your app's state as well
  } catch (error) {
    dispatch({
      type: SIGN_OUT,
      payload: null,
    });
    console.error(error);
  }

  // navigation.dispatch(
  //   CommonActions.navigate({
  //     name: 'Welcome',
  //   }),
  // )
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

const OTPPhoneNumberVerified = (phoneNumber) => async (dispatch, getState) => {

  try {
    let userVerified = true;
    let userPhoneNumber = phoneNumber;

    let localUserDetails = {...getState().authState, userVerified, userPhoneNumber};
    await AsyncStorage.setItem('localUserDetails', stringify(localUserDetails));
    // console.log('localUserDetails', localUserDetails);
    dispatch({
      type: PHONE_NO_VERIFICATION,
      payload: true,
    });
    dispatch({
      type: SIGN_IN_WITH_PHONE_NUMBER,
      payload: phoneNumber,
    });
    dispatch({
      type: USER_VERIFIED,
      payload: true,
    });

  } catch (error) {

    console.error(error);
  }
};

const signInError = (error) => async (dispatch) => {

  dispatch({
    type:   SIGN_IN_ERROR,
    payload: error,
  });
};

export const authActions = {
  signOut,
  signInError,
  signInWithGoogle,
  OTPPhoneNumberVerified,
  setInitialState,
};
