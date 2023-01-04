// const _ = require('lodash');
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {processMpesa} from '../_actionsMethods/processMpesa.js';
import {mpesaAggregator} from '../_actionsMethods/mpesaAggregator.js';
import SmsAndroid from 'react-native-get-sms-android';

/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import {DateFilter} from '../_helpers/DateFilter';
import {
  STORE_MESSAGES,
  GET_COLLECTION,
  AGGREGATED_DATA,
  GET_BALANCES,
} from './types';
var stringify = require('fast-json-stable-stringify');

// Global regex variables
const provioderList = [
  'MPESA',
  'NCBA',
  'AIRTEL',
  'COOPBANK',
  'KCB',
  'Equity Bank',
];
const storeMessages = messages => async dispatch => {
  console.log('COLLECTIONS', messages);
  // AsyncStorage.removeItem('COLLECTION').then(() => console.log('Cleared'));

  let processedCollections = {};
  for (const [address, collection] of Object.entries(messages)) {
    console.log('address', address);
    if (address === 'MPESA') {
      const processedCollection = await processMpesa(collection);
      processedCollections[address] = processedCollection;
    } else {
      // null for now until we create a way to process new adress
      processedCollections[address] = null;
    }
  }
  // const messagesProcesses = await processMpesa(messages["MPESA"]);
  console.log('processedCollections', processedCollections);

  const messageCollection = await stringify(processedCollections);

  console.log('processedCollections', processedCollections);
  try {
    await AsyncStorage.setItem('PROCESSED_COLLECTIONS', messageCollection);
    dispatch({
      type: STORE_MESSAGES,
      payload: JSON.parse(messageCollection),
    });

    dispatch(aggregatorMessageData());
    // loadAndStoreMessages(address);
    dispatch(getBalance());
  } catch (e) {
    // console.log(e);
    dispatch({
      type: STORE_MESSAGES,
      payload: [],
    });
    // saving error
  }
};

// const loadAndStoreMessages = async address => {
//   let filter = {
//     box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
//     // read: 0, // 0 for unread SMS, 1 for SMS already read
//     address, // sender's phone number
//     // body: , // content to match
//     // the next 2 filters can be used for pagination
//     // indexFrom: 0, // start from index 0
//     // maxCount: 10, // count of SMS to return each time
//   };
//   try {
//     const smsList = await SmsAndroid.list(filter);
//     console.log('smsList', smsList);
//   } catch (error) {
//     console.log(`Failed with this error: ${error}`);
//   }
// };
const filterType = data => {
  let typesSummed = _(data)
    .groupBy('TYPE')
    .map((objs, key) => {
      return {
        TYPE: key,
        AMOUNT: _.sumBy(objs, 'AMOUNT'),
      };
    })
    .value();
  return typesSummed;
  // console.log(summed);
};
const aggregatorMessageData = () => async dispatch => {
  let aggregatorMessageCollections = {};
  // ('Sent');
  // ('Receive');
  // ('PayBill');
  // ('BuyGoods');
  // ('Withdraw');
  let messageCollections;
  let data;

  const messageCollection = JSON.parse(
    await AsyncStorage.getItem('PROCESSED_COLLECTIONS'),
  );

  for (const [address, collection] of Object.entries(messageCollection)) {
    if (address === 'MPESA') {
      let mpesaAggregatored = await mpesaAggregator(
        DateFilter(collection, 'max'),
      );
      aggregatorMessageCollections = {
        ...aggregatorMessageCollections,
        MPESA: mpesaAggregatored,
      };
    } else {
      // null untill we find a way to aggregate data
      aggregatorMessageCollections = {
        ...aggregatorMessageCollections,
        [address]: null,
      };
    }
  }

  dispatch({
    type: AGGREGATED_DATA,
    payload: aggregatorMessageCollections,
  });
};
const getCollection = () => async dispatch => {
  let allCollections = {};
  const messageCollection = JSON.parse(
    await AsyncStorage.getItem('PROCESSED_COLLECTIONS'),
  );

  for (const [address, collection] of Object.entries(messageCollection)) {
    allCollections = {
      ...allCollections,
      [address]: collection,
    };
  }
  // console.log(storageCollection);
  dispatch({
    type: GET_COLLECTION,
    payload: allCollections,
  });
};

const getBalance = () => async dispatch => {
  let balances = {};
  const messageCollection = JSON.parse(
    await AsyncStorage.getItem('PROCESSED_COLLECTIONS'),
  );
  console.log('messageCollection', messageCollection);
  for (const [address, collection] of Object.entries(messageCollection)) {
    if (address === 'MPESA') {
      balances = {
        ...balances,
        MPESA: collection[0].BALANCE || 0,
      };
      console.log('balances', balances);
    } else {
      balances = {
        ...balances,
        [address]: 0,
      };
    }
  }
  console.log('balances', balances);
  // console.log([{...mpesaBalance}]);
  dispatch({
    type: GET_BALANCES,
    payload: balances,
  });
};

const removeFromStorage = () => async dispatch => {
  await AsyncStorage.removeItem('COLLECTION');
  dispatch({
    type: GET_COLLECTION,
    payload: [],
  });
};

export const messageActions = {
  getCollection,
  storeMessages,
  getBalance,
  removeFromStorage,
};
