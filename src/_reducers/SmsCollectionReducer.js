import  {POPULATE_DATA, STORE_MESSAGES, GET_COLLECTION } from "../_actions/types";

const initialState = {
    collection: [],
    collectionState: false,
}

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
    default:
      return state;
  }
};

export default SmsCollectionReducer;