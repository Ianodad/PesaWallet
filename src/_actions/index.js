// const _ = require('lodash');
import { processMpesa } from '../_actionsMethods/processMpesa.js'
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import {STORE_MESSAGES} from './types';
import  _  from 'lodash';
import AsyncStorage from '@react-native-community/async-storage'


// Global regex variables

export const storeMessages = (address, messages) => async (dispatch) => {
  const  messagesProcesses = await processMpesa(messages);
  // console.log(messagesProcesses)
  const messageJson= JSON.parse(messagesProcesses)
  console.log(messageJson)
  // try {
  //   await AsyncStorage.setItem(STORAGE_KEY, age)
  //   alert('Data successfully saved')
  // } catch (e) {
  //   alert('Failed to save the data to the storage')
  // }
  dispatch ({
    type: STORE_MESSAGES,
    payload: messagesProcesses,
  });
};
