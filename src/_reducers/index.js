import {combineReducers} from 'redux';

// Imports: Reducers
import SmsCollectionReducer from './SmsCollectionReducer';
import authReducer from './authReducer';

// console.log(SmsCollectionReducer)
// Redux: Root Reducer
const rootReducer = combineReducers({
  SmsCollected: SmsCollectionReducer,
  authState: authReducer,
});

// Exports
export default rootReducer;
