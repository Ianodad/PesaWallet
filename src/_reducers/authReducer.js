import {
  SIGN_OUT,
  SIGN_IN_ERROR,
  SET_INITIAL_USER_STATE,
  SIGN_IN_WITH_GOOGLE,
  SIGN_IN_WITH_PHONE_NUMBER,
  GOOGLE_VERIFICATION,
  PHONE_NO_VERIFICATION,
  USER_VERIFIED,
} from '../_actions/types';

const initialState = {
  userDetails: null,
  userPhoneNumber: null,
  subscriptionType: 'basic',
  googleVerification: false,
  phoneNoVerification: false,
  userVerified: false,
  collectionState: false,
  signInError: '',
};

const SmsCollectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_USER_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        userDetails: action.payload,
      };
    case SIGN_IN_WITH_GOOGLE:
      return {
        ...state,
        userDetails: action.payload,
      };
    case GOOGLE_VERIFICATION:
      return {
        ...state,
        googleVerification: action.payload,
      };
    case SIGN_IN_WITH_PHONE_NUMBER:
      return {
        ...state,
        userPhoneNumber: action.payload,
      };
    case PHONE_NO_VERIFICATION:
      return {
        ...state,
        phoneNoVerification: action.payload,
      };
    case USER_VERIFIED:
      return {
        ...state,
        userVerified: action.payload,
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        signInError: action.payload,
      };
    default:
      return state;
  }
};

export default SmsCollectionReducer;
