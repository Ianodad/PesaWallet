import {
  SIGN_OUT,
  SIGN_IN_WITH_GOOGLE,
  SIGN_IN_WITH_PHONE_NUMBER,
  SIGN_IN_ERROR,
} from './types';

// Global regex variables

const signOut = () => async (dispatch) => {
  dispatch({
    type: SIGN_OUT,
    payload: null,
  });
};

const signInWithGoogle = () => async (dispatch) => {
  try {
    dispatch({
      type: SIGN_IN_WITH_GOOGLE,
      payload: null,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SIGN_IN_ERROR,
      payload: null,
    });
    // Error retrieving data
  }
};

const signWithPhoneNumber = () => async (dispatch) => {
  dispatch({
    type: SIGN_IN_WITH_PHONE_NUMBER,
    payload: null,
  });
};

const codeConfirmation = () => async (dispatch) => {
  dispatch({
    type: SIGN_IN_WITH_PHONE_NUMBER,
    payload: null,
  });
};

export const authActions = {
  signOut,
  signInWithGoogle,
};
