// const _ = require('lodash');
import { processMpesa } from '../_actionsMethods/processMpesa.js'
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import {STORE_MESSAGES} from './types';
import  _  from 'lodash';

// Global regex variables

export const storeMessages = (address, messages) => async (dispatch) => {
  const  messagesProcesses = await processMpesa(messages);
  console.log(messagesProcesses)

  dispatch ({
    type: STORE_MESSAGES,
    payload: messagesProcesses,
  });
};
