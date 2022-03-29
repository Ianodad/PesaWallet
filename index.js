import {ApolloProvider} from '@apollo/client';
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {name as appName} from './app.json';
import {persister, store} from './src/_store/configurestore';
import client from './src/graphql/apolloClient';
import 'react-native-gesture-handler';

const ReactNative = () => (
  <>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </>
);

AppRegistry.registerComponent(appName, () => ReactNative);
