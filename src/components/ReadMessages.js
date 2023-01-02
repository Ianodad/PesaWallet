/* eslint-disable no-undef */
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {connect} from 'react-redux';
import _ from 'lodash';

// import { ReadAllMessages} from "../_helpers/ReadAllMessages"

import {messageActions} from '../_actions/index';

import * as allActionTypes from '../_actions/types';

const {storeMessages} = messageActions;
// eslint-disable-next-line no-shadow
const ReadAllMessages = ({collection, storeMessages}) => {
  const [typeCollection, setTypeCollection] = useState({});

  const ReadAll = useCallback((address, callback) => {
    let filter = {
      box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
      // read: 0, // 0 for unread SMS, 1 for SMS already read
      address: address, // sender's phone number
      // body: , // content to match
      // the next 2 filters can be used for pagination
      indexFrom: 0, // start from index 0
      // maxCount: 200, // count of SMS to return each time
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        // if (!count) return null
        // console.log('Count: ', count);
        // console.log('List: ', smsList);
        var arr = JSON.parse(smsList);
        console.log('sms', address);
        // console.log(callback);
        callback(address, arr);
      },
    );
  }, []);

  const provioderList = [
    'MPESA',
    'NCBA',
    'airtelmoney',
    'COOPBANK',
    'KCB',
    'TKASH',
    'Equity Bank',
    'ABSA',
  ];
  let data = {};
  useEffect(() => {
    const setMessages = (address, messages) => {
      console.log('setMessages', messages);
      data = {...data, [address]: messages};
      if (Object.keys(data).length === provioderList.length) {
        storeMessages(data);
      }
    };

    provioderList.map(provider => {
      console.log('provider', provider);
      ReadAll(provider, setMessages);
      console.log('typeCollection', typeCollection);
    });
    // let data = {};

    // Update the document title using the browser API
    // collectSms();
  }, [ReadAll]);

  return <></>;
};

const mapStateToProps = state => {
  const {SmsCollected} = state;
  // console.log(SmsCollected.collection)
  return {
    collection: SmsCollected.collection,
  };
};
//   {
//   collection: state.collection,
// });

const mapDispatchToProps = {storeMessages};

export default connect(mapStateToProps, mapDispatchToProps)(ReadAllMessages);
