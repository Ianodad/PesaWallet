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
  apiKey: API_KEY,
  authDomain: API_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}
// firebase.initializeApp(firebaseConfig);

export {firebase, Auth, firestore};
