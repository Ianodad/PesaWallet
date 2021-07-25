import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

// imports" Redux
import rootReducer from '../_reducers';

const persistConfig = {
  // Root?
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['aggregateReducer'],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: ['SmsCollectionReducer'],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
// const store = createStore(persistedReducer, applyMiddleware(createLogger()));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composeEnhancers = composeWithDevTools({
//   realtime: true,
//   port: 8081,
//   hostname: '10.0.2.2', //add your computer's IP
// });

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(ReduxThunk)),
);

// Middleware: Redux Persister
let persister = persistStore(store);
export {store, persister};
