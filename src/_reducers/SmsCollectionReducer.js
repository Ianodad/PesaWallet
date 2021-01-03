import  {POPULATE_DATA, STORE_MESSAGES } from "../_actions/types";

const initialState = {
    collection: []
}

const SmsCollectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_MESSAGES:
      
      // const object = action.payload
      // console.log(JSON.stringify(action.payload, null, "  "));
      return {
        ...state,
        collection: action.payload,
      };
    default:
      return state;
  }
};

export default SmsCollectionReducer;