// import * as firebase from 'firebase';

import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import settings from '../config/settings';

// console.log(firebase)
console.log(settings);
const firebaseConfig = {
  // apiKey: 'AIzaSyB1BBhKWO6ngq_qgmCdIojCZxrxjtRY40I',
  // authDomain: 'pesasite-c7394.firebaseapp.com',
  // projectId: 'pesasite-c7394',
  // storageBucket: 'pesasite-c7394.appspot.com',
  // messagingSenderId: '538828734422',
  // appId: '1:538828734422:web:9fe42336ff2e3532b5ee77',
  // measurementId: 'G-HGC2XS6NBN',
  apiKey: settings.API_KEY,
  authDomain: settings.API_DOMAIN,
  projectId: settings.PROJECT_ID,
  storageBucket: settings.STORAGE_BUCKET,
  messagingSenderId: settings.MESSAGING_SENDER_ID,
  appId: settings.APP_ID,
  measurementId: settings.MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}
// firebase.initializeApp(firebaseConfig);

export {firebase, Auth, firestore};
