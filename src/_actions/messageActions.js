// const _ = require('lodash');
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {processMpesa} from '../_actionsMethods/processMpesa.js';
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import {
  STORE_MESSAGES,
  GET_COLLECTION,
  AGGREGATED_DATA,
  GET_BALANCES,
} from './types';
var stringify = require('fast-json-stable-stringify');

// Global regex variables

const storeMessages = (address, messages) => async dispatch => {
  // AsyncStorage.removeItem('COLLECTION').then(() => console.log('Cleared'));
  const messagesProcesses = await processMpesa(messages);
  // console.log('messageProcess', messages);

  const messageCollection = await stringify(messagesProcesses);

  try {
    await AsyncStorage.setItem('COLLECTION', messageCollection);
    dispatch({
      type: STORE_MESSAGES,
      payload: JSON.parse(messageCollection),
    });

    dispatch(aggregatorMessageData());
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
  // ('Sent');
  // ('Receive');
  // ('PayBill');
  // ('BuyGoods');
  // ('Withdraw');
  const messageCollection = JSON.parse(
    await AsyncStorage.getItem('COLLECTION'),
  );
  let data = [];
  const sent = await _.filter(messageCollection, {TYPE: 'Sent'});
  const SentTotal = await filterType(sent);
  data.push({...SentTotal[0], ...{LENGTH: sent.length}});
  // console.log('Sent', typeof SentTotal);
  const received = _.filter(messageCollection, {TYPE: 'Receive'});
  const ReceivedTotal = await filterType(received);
  data.push({...ReceivedTotal[0], ...{LENGTH: received.length}});
  // console.log('Receive', ReceivedTotal);
  const paybill = _.filter(messageCollection, {TYPE: 'PayBill'});
  const PayBillTotal = await filterType(paybill);
  data.push({...PayBillTotal[0], ...{LENGTH: paybill.length}});
  // console.log('PayBill', paybill);
  const buyGoods = _.filter(messageCollection, {TYPE: 'BuyGoods'});
  const BuyGoodsTotal = await filterType(buyGoods);
  data.push({...BuyGoodsTotal[0], ...{LENGTH: buyGoods.length}});
  // console.log('BuyGoods', buyGoods);
  const withdraw = _.filter(messageCollection, {TYPE: 'Withdraw'});
  const WithdrawTotal = await filterType(withdraw);
  data.push({...WithdrawTotal[0], ...{LENGTH: withdraw.length}});
  // console.log('Withdraw', WithdrawTotal);
  // const cilter = filterType(collectionFiltered);
  // console.log('aggregator', data);

  dispatch({
    type: AGGREGATED_DATA,
    payload: data,
  });
};
const getCollection = () => async dispatch => {
  try {
    const messageCollection = await AsyncStorage.getItem('COLLECTION');
    // console.log('messageCollection', messageCollection);
    const storageCollection =
      messageCollection != null ? JSON.parse(messageCollection) : null;

    // console.log(storageCollection);
    dispatch({
      type: GET_COLLECTION,
      payload: storageCollection,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_COLLECTION,
      payload: null,
    });
    // Error retrieving data
  }
};

const getBalance = () => async dispatch => {
  const messageCollection = await AsyncStorage.getItem('COLLECTION');

  let balances = {};
  let mpesaBalance = {Mpesa: JSON.parse(messageCollection)[0].BALANCE};
  // console.log([{...mpesaBalance}]);
  const data = {...mpesaBalance};
  dispatch({
    type: GET_BALANCES,
    payload: data,
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
