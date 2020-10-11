import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import ReduxThunk from 'redux-thunk';

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

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));

// Middleware: Redux Persister
let persister = persistStore(store);
export {store, persister};
