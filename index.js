import {AppRegistry} from 'react-native';
import React from 'react'
import App from './App';
import {name as appName} from './app.json';
import {createStore} from "redux";
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';


import {store, persister} from './src/_store/configurestore'


const ReactNative = () => (
  <Provider store={store}>
  <PersistGate loading={null} persistor={persister}>
    <App />
   </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReactNative);