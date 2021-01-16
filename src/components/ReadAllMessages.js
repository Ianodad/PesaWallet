/* eslint-disable no-undef */
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import SmsAndroid from 'react-native-get-sms-android';
// import { ReadMessages} from "../_helpers/ReadMessages"
import {storeMessages} from '../_actions/index';
import * as allActionTypes from '../_actions/types';

// eslint-disable-next-line no-shadow
const ReadAllMessages = ({collection, storeMessages}) => {
  

  const ReadMessages = useCallback((address, callback) => {
    let filter = {
      box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
      // read: 0, // 0 for unread SMS, 1 for SMS already read
      address, // sender's phone number
      // body: , // content to match
      // the next 2 filters can be used for pagination
      // indexFrom: 0, // start from index 0
      // maxCount: 10, // count of SMS to return each time
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        // if (!count) return null
        console.log('Count: ', count);
        // console.log('List: ', smsList);
        var arr = JSON.parse(smsList);
        callback(address, arr);
        // console.log(arr);
      },
    );
  }, []);

  useEffect(() => {
    ReadMessages('MPESA', storeMessages);

    // Update the document title using the browser API
    // collectSms();
  }, [ReadMessages, storeMessages]);

  return (
    <View>
      {/* <Text>{collection}</Text> */}
      <Text>Hello</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  const {SmsCollected} = state;
  return {
    collection: SmsCollected.collection,
  };
};
//   {
//   collection: state.collection,
// });

const mapDispatchToProps = {storeMessages};

export default connect(mapStateToProps, mapDispatchToProps)(ReadAllMessages);
