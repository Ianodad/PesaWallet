import {
  POPULATE_DATA,
  STORE_MESSAGES,
  GET_COLLECTION,
  AGGREGATED_DATA,
} from '../_actions/types';

const initialState = {
  collection: [],
  collectionState: false,
  aggregatedMessageData: [],
};

const SmsCollectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLECTION:
      return {
        ...state,
        collection: action.payload,
      };
    case STORE_MESSAGES:
      return {
        ...state,
        collection: action.payload,
      };
    case AGGREGATED_DATA:
      return {
        ...state,
        aggregatedMessageData: action.payload,
      };
    default:
      return state;
  }
};

export default SmsCollectionReducer;
