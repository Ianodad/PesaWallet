// const _ = require('lodash');
import { processMpesa } from '../_actionsMethods/processMpesa.js'
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import {STORE_MESSAGES, GET_COLLECTION} from './types';
import  _  from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
var stringify = require('fast-json-stable-stringify');


// Global regex variables

export const storeMessages = (address, messages) => async (dispatch) => {
  const  messagesProcesses = await processMpesa(messages);
  
  const messageCollection = await stringify(messagesProcesses)
  // console.log(messageCollection)
  try {
    await AsyncStorage.setItem('COLLECTION', messageCollection)
    dispatch ({
      type: STORE_MESSAGES,
      payload: JSON.parse(messageCollection),
    });
  } catch (e) {
    console.log(e)
    dispatch ({
      type: STORE_MESSAGES,
      payload: [],
    });
    // saving error
  }
};

export const getCollection = () => async (dispatch) => {
  try {
    const messageCollection = await AsyncStorage.getItem('COLLECTION');
    console.log(messageCollection)
    const storageCollection = messageCollection != null ? JSON.parse(messageCollection) : null;

      console.log(storageCollection);
      dispatch ({
        type: GET_COLLECTION,
        payload: storageCollection,
      });
  } catch (error) {
    console.log(error)
    dispatch ({
        type: GET_COLLECTION,
        payload: null,
      });
    // Error retrieving data
  }
};
