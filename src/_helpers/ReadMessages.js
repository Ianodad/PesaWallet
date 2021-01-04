import SmsAndroid from 'react-native-get-sms-android';

export const ReadMessages =
  ((address, callback) => {
    let filter = {
      box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
      // read: 0, // 0 for unread SMS, 1 for SMS already read
      address: 'MPESA', // sender's phone number
      // body: , // content to match
      // the next 2 filters can be used for pagination
      indexFrom: 900, // start from index 0
      // maxCount: 10, // count of SMS to return each time
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        // if (!count) return null
        // console.log('Count: ', count);
        // console.log('List: ', smsList);
        var arr = JSON.parse(smsList);
        callback(address, arr);
        // console.log(arr);
      },
    );
  },
  []);
