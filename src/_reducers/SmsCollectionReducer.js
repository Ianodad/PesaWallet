import {
  POPULATE_DATA,
  STORE_MESSAGES,
  GET_COLLECTION,
  AGGREGATED_DATA,
  GET_BALANCES,
  SELECT_PROVIDER_TYPE,
} from '../_actions/types';

const initialState = {
  collection: [],
  balances: [],
  providerType: null,
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
    case GET_BALANCES:
      return {
        ...state,
        balances: action.payload,
      };
    case SELECT_PROVIDER_TYPE:
      return {
        ...state,
        providerType: action.payload,
      };
    default:
      return state;
  }
};

export default SmsCollectionReducer;
