// import * as firebase from 'firebase';

import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import settings from '../config/settings';
import {
  API_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from '@env';
// console.log(firebase)
// console.log(settings);
const firebaseConfig = {
  apiKey: 'AIzaSyD9rdhS6tsTrwiSDz03j6WA2pOyWknZOac',
  authDomain: 'pesawallett.firebaseapp.com',
  projectId: 'pesawallett',
  storageBucket: 'pesawallett.appspot.com',
  messagingSenderId: '445455504561',
  appId: '1:445455504561:web:b86289d6241b174a1b7e90',
  measurementId: 'G-Z2T4DZ74CM',
  // apiKey: API_KEY,
  // authDomain: API_DOMAIN,
  // projectId: PROJECT_ID,
  // storageBucket: STORAGE_BUCKET,
  // messagingSenderId: MESSAGING_SENDER_ID,
  // appId: APP_ID,
  // measurementId: MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}
// firebase.initializeApp(firebaseConfig);

export {firebase, Auth, firestore};
