import {forEach} from 'lodash';
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import {STORE_MESSAGES} from './types';
const _ = require('lodash');

// Global regex variables


export const storeMessages = (address, messages) => async (dispatch) => {
  await processMpesa(messages);
  // console.log(messages.body);
  // messages.forEach((data)=>{
  //   console.log(data.body)
  // })
  // console.log(address);

  return {
    type: STORE_MESSAGES,
    payload: messages,
  };
};

const processMpesa = (mpesaData) => {
    console.log(mpesaData[0].body)
}
