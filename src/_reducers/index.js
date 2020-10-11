import {combineReducers} from 'redux';

// Imports: Reducers
import SmsCollectionReducer from './SmsCollectionReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  SmsCollected: SmsCollectionReducer,
});

// Exports
export default rootReducer;