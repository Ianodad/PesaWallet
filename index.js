import {ApolloProvider} from '@apollo/client';
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {name as appName} from './app.json';
import client from './src/graphql/apolloClient';
import {persister, store} from './src/_store/configurestore';


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
