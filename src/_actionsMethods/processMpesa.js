const stringifyObject = require('stringify-object');

const sent = 'sent';
const receive = 'receive';
const accountPaid = 'account';
const goodsPaid = 'paid';
const deposit = 'Give';
const withdraw = ['PMWithdraw', 'AMWithdraw'];
const airtime = 'of airtime';
const reverse = 'Reversal';
const failed = 'Failed.';

export const processMpesa = mpesaData => {
  // // holds all processed messages
  let allData = [];
  mpesaData.forEach(textMessage => {
    const {body} = textMessage;
    if (body.includes(sent) && !body.includes(accountPaid)) {
      allData.push(processSent(body, sent));
    } else if (body.includes(receive)) {
      allData.push(processReceived(body, receive));
    } else if (
      body.includes(accountPaid) &&
      !body.includes(reverse) &&
      !body.includes('now active') &&
      !body.includes('request') &&
      !body.includes('account balance') &&
      !body.includes('enough money') &&
      !body.includes('Failed.')
    ) {
      allData.push(processAccountPaid(body, accountPaid));
    } else if (body.includes(goodsPaid)) {
      allData.push(processGoodsPaid(body, goodsPaid));
    } else if (body.includes(deposit)) {
      allData.push(processDeposit(body, deposit));
    } else if (withdraw.some(word => body.includes(word))) {
      allData.push(processWithdraw(body, withdraw));
    } else if (body.includes(airtime)) {
      allData.push(processAirtime(body, airtime));
    } else if (body.includes(reverse)) {
      allData.push(processReversed(body, reverse));
    }
  });
  return allData;
};

// This is function takes in message and type message to processed and cleaned
function processSent(message, sent) {
  // cleanedSend takes in filtered and type to clean data
  return cleanedSend(filterContent(message, sent), message);
}

function processReceived(message, receive) {
  return cleanedReceive(filterContent(message, receive), message);
}

function processAccountPaid(message, accountPaid) {
  return cleanedAccountPaid(filterContent(message, accountPaid), message);
}

function processGoodsPaid(message, goodsPaid) {
  return cleanedGoodsPaid(filterContent(message, goodsPaid), message);
}

function processDeposit(message, deposit) {
  return cleanedDeposit(filterContent(message, deposit), message);
}

function processWithdraw(message, withdraw) {
  return cleanedWithdraw(filterContent(message, withdraw), message);
}

function processAirtime(message, airtime) {
  return cleanedAirtime(filterContent(message, airtime), message);
}
function processReversed(message, reverse) {
  return cleanReverse(filterContent(message, reverse), message);
}

function cleanedSend(clean, message) {
  try {
    const TYPE = 'Sent';
    const FINANCE = 'Debit';
    const ID = cleanSwitch(clean, 'ID');
    let PHONENO = cleanSwitch(clean, 'PHONENO');
    let DATE = cleanSwitch(clean, 'DATE');

    const AMOUNT = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
    const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
    const COST = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[2]);

    const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')}`;
    const MESSAGE = message;
    let NAME;
    if (PHONENO) {
      NAME = nameCapitalize(
        clean
          .slice(
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
            clean.indexOf(PHONENO),
          )
          .join(' '),
      );
    } else {
      NAME = nameCapitalize(
        clean
          .slice(
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
            clean.indexOf(DATE),
          )
          .join(' '),
      );
      PHONENO = null;
    }
    DATE = dateConverter(DATE);

    const data = {
      ID,
      AMOUNT,
      NAME,
      PHONENO,
      TIME,
      DATE,
      BALANCE,
      COST,
      TYPE,
      FINANCE,
      MESSAGE,
    };
    // console.log(data)
    return data;
  } catch (error) {
    // console.log(error.name);
    // console.log(error.message);
    // console.log('Found in data', clean);
  }
}

function cleanedReceive(clean, message) {
  try {
    const TYPE = 'Receive';
    const FINANCE = 'Credit';
    const ID = cleanSwitch(clean, 'ID');
    let PHONENO = cleanSwitch(clean, 'PHONENO');
    let DATE = cleanSwitch(clean, 'DATE');
    const AMOUNT = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
    const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
    const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')}`;
    const MESSAGE = message;

    let NAME;
    if (PHONENO) {
      NAME = nameCapitalize(
        clean
          .slice(
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
            clean.indexOf(PHONENO),
          )
          .join(' '),
      );
    } else {
      NAME = nameCapitalize(
        clean
          .slice(
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
            clean.indexOf(DATE),
          )
          .join(' '),
      );
      PHONENO = null;
    }

    DATE = dateConverter(DATE);

    const data = {
      ID,
      AMOUNT,
      NAME,
      PHONENO,
      TIME,
      DATE,
      BALANCE,
      TYPE,
      FINANCE,
      MESSAGE,
    };
    return data;
  } catch (error) {
    // console.log(error.name);
    // console.log(error.message);
    // console.log('Found in data', clean);
  }
}

function cleanedAccountPaid(clean, message) {
  try {
    const TYPE = 'PayBill';
    const FINANCE = 'Debit';
    const ID = cleanSwitch(clean, 'ID');
    let DATE = cleanSwitch(clean, 'DATE');
    let PHONENO = cleanSwitch(clean, 'PHONENO');
    const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')}`;
    const AMOUNT = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
    const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
    const COST = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[2]);
    const MESSAGE = message;

    let NAME;

    if (PHONENO) {
      NAME = nameCapitalize(
        clean
          .slice(
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
            clean.indexOf(PHONENO),
          )
          .join(' '),
      );
    } else {
      NAME = nameCapitalize(
        clean
          .slice(
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
            clean.indexOf(DATE),
          )
          .join(' '),
      );
      PHONENO = null;
    }
    DATE = dateConverter(DATE);

    const data = {
      ID,
      AMOUNT,
      NAME,
      PHONENO,
      TIME,
      DATE,
      BALANCE,
      COST,
      TYPE,
      FINANCE,
      MESSAGE,
    };
    return data;
  } catch (error) {
    // console.log(error.name);
    // console.log(error.message);
    // console.log('Found in data', clean);
  }
}

function cleanedGoodsPaid(clean, message) {
  try {
    const TYPE = 'BuyGoods';
    const FINANCE = 'Debit';
    const ID = cleanSwitch(clean, 'ID');
    let DATE = cleanSwitch(clean, 'DATE');
    let PHONENO = cleanSwitch(clean, 'PHONENO');
    const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')
      .match(/^[AM|PM]{2}/)
      .join('')}`;
    const AMOUNT = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
    const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
    const COST = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[2]);
    const MESSAGE = message;

    let NAME;

    if (PHONENO) {
      NAME = nameCapitalize(
        clean
          .slice(
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
            clean.indexOf(PHONENO),
          )
          .join(' '),
      );
    } else {
      NAME = nameCapitalize(
        clean
          .slice(
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
            clean.indexOf(DATE),
          )
          .join(' '),
      );
      PHONENO = null;
    }

    // console.log(ACCOUNTNAME)
    DATE = dateConverter(DATE);

    const data = {
      ID,
      AMOUNT,
      NAME,
      PHONENO,
      TIME,
      DATE,
      BALANCE,
      COST,
      TYPE,
      FINANCE,
      MESSAGE,
    };
    //   console.log(data)
    return data;
  } catch (error) {
    // console.log(error.name);
    // console.log(error.message);
    // console.log('Found in data', clean);
  }
}

function cleanedDeposit(clean, message) {
  try {
    const TYPE = 'Deposit';
    const FINANCE = 'Credit';
    const ID = cleanSwitch(clean, 'ID');
    let DATE = cleanSwitch(clean, 'DATE');
    let PHONENO = cleanSwitch(clean, 'PHONENO');
    const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')}`;
    const AMOUNT = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
    const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
    const MESSAGE = message;

    let NAME;

    if (PHONENO) {
      NAME = nameCapitalize(
        clean
          .slice(
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
            clean.indexOf(PHONENO),
          )
          .join(' '),
      );
    } else {
      NAME = nameCapitalize(
        clean
          .slice(
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[1]),
          )
          .join(' '),
      );
      PHONENO = null;
    }

    DATE = dateConverter(DATE);

    const data = {
      ID,
      AMOUNT,
      NAME,
      PHONENO,
      TIME,
      DATE,
      BALANCE,
      TYPE,
      FINANCE,
      MESSAGE,
    };
    return data;
  } catch (error) {
    // console.log(error.name);
    // console.log(error.message);
    // console.log('Found in data', clean);
  }
}

function cleanedWithdraw(clean, message) {
  try {
    const TYPE = 'Withdraw';
    const FINANCE = 'Debit';
    const ID = cleanSwitch(clean, 'ID');
    let DATE = cleanSwitch(clean, 'DATE');
    let PHONENO = cleanSwitch(clean, 'PHONENO');
    const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')
      .match(/^[AM|PM]{2}/)
      .join('')}`;
    const AMOUNT = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
    const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
    const AGENTNO = clean[clean.indexOf('-') - 1];
    const MESSAGE = message;

    let NAME;
    if (PHONENO) {
      NAME = nameCapitalize(
        clean
          .slice(
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
            clean.indexOf(PHONENO),
          )
          .join(' '),
      );
    } else {
      NAME = nameCapitalize(
        clean
          .slice(
            clean.indexOf('-') + 1,
            clean.indexOf(cleanSwitch(clean, 'ALLCASH')[1]),
          )
          .join(' '),
      );
      PHONENO = null;
    }

    // console.log(AGENTNAME)
    DATE = dateConverter(DATE);

    const data = {
      ID,
      AMOUNT,
      PHONENO,
      AGENTNO,
      NAME,
      TIME,
      DATE,
      BALANCE,
      TYPE,
      FINANCE,
      MESSAGE,
    };
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log('Found in data', clean);
  }
}

function cleanedAirtime(clean, message) {
  try {
    const TYPE = 'Airtime';
    const ID = cleanSwitch(clean, 'ID');
    let DATE = cleanSwitch(clean, 'DATE');
    let PHONENO = cleanSwitch(clean, 'PHONENO');
    const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')
      .match(/^[AM|PM]{2}/)
      .join('')}`;
    const AMOUNT = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
    const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
    const COST = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[2]);
    const FINANCE = 'Debit';
    const MESSAGE = message;

    // console.log(COST);

    DATE = dateConverter(DATE);

    const data = {
      ID,
      AMOUNT,
      PHONENO,
      TIME,
      DATE,
      BALANCE,
      COST,
      TYPE,
      FINANCE,
      MESSAGE,
    };
    // console.log(data)
    return data;
  } catch (error) {
    // console.log(error.name);
    // console.log(error.message);
    // console.log('Found in data', clean);
  }
}

function cleanReverse(clean, message) {
  try {
    const TYPE = 'Reverse';
    const FINANCE = 'Credit';
    const ID = cleanSwitch(clean, 'ALLIDS')[0];
    const TRANSACTION_ID = cleanSwitch(clean, 'ALLIDS')[1];
    let DATE = cleanSwitch(clean, 'DATE');
    const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')}`;
    const AMOUNT = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
    const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
    const MESSAGE = message;

    DATE = dateConverter(DATE);
    const data = {
      ID,
      TRANSACTION_ID,
      DATE,
      TIME,
      AMOUNT,
      BALANCE,
      TYPE,
      FINANCE,
      MESSAGE,
    };

    //   console.log(data);
    return data;
  } catch (error) {
    // console.log(error.name);
    // console.log(error.message);
    // console.log('Found in data', clean);
  }
}

function cleanSwitch(clean, type) {
  const regexID = /[0-9a-zA-Z]{10}/; // get ID
  // const regexPhoneNo = /^[07|+254|254][0-9]{9}/; // Phone number
  const regexPhoneNo = /^((\+?254)|0)(7(?:[0-9]{7}|[0-9]{8}))$/; // Phone number
  const regexName = /([A-Z])\w+/;
  const regexDate = /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/;
  const regexTime = /:[0-5][0-9]/;
  const regexKsh = /Ksh[0-9]/g;
  const regexAMPM = /(?:^|\W)(AM|PM|PMWithdraw|AMWithdraw)(?:$|\W)/;

  switch (type) {
    case 'ID':
      return cleanFind(clean, regexID);
      break;
    case 'PHONENO':
      return cleanFind(clean, regexPhoneNo);
      break;
    case 'DATE':
      return cleanFind(clean, regexDate);
      break;
    case 'TIME':
      return cleanFind(clean, regexTime);
      break;
    case 'ALLCASH':
      return cleanFilter(clean, regexKsh);
    case 'AMPM':
      return cleanFind(clean, regexAMPM);
    case 'ALLIDS':
      return cleanFilter(clean, regexID);
      break;
    default:
      console.log('Error');
      return 'Nothing to commit here';
      break;
  }
}

function cleanFind(array, regex) {
  return array.find(element => element.match(regex));
}

function cleanFilter(array, regex) {
  return array.filter(element => element.match(regex));
}

function filterContent(message, type) {
  const receiveFilter = [
    'Confirmed.You',
    'have',
    'received',
    'from',
    'on',
    'at',
    'New',
    'M-PESA.',
    'balance',
    'is',
    'Buy',
    'with',
    'goods',
    'To',
    'reverse',
    'forward',
    'reverse,',
    'forward',
    'this',
    'message',
    'to',
    '456.',
    'M-PESA',
  ];

  const sentFilter = [
    ...receiveFilter,
    'Confirmed.',
    'Confirmed',
    'sent',
    'Transaction',
    'cost,',
    'Amount',
    'you',
    'can',
    'transact',
    'within',
    'the',
    'day',
  ];

  const accountPaidFilter = [
    ...sentFilter,
    'cost',
    'account',
    'for',
    'paid',
    'Dial',
    '*234*1#',
    'manage',
    'your',
    'bills.',
  ];

  const reverseFilter = [
    ...accountPaidFilter,
    'confirmed.',
    'Reversal',
    'of',
    'transaction',
    'has',
    'been',
    'successfully',
    'reversed',
    'and',
    'debited',
    'your',
    'account.',
  ];

  const goodsPaidFilter = [...reverseFilter, 'paid', 'MPESA'];
  const depositFilter = [
    ...goodsPaidFilter,
    'Give',
    'On',
    'cash',
    'Cellular',
    'In',
  ];
  const withdrawFilter = [...depositFilter, 'Confirmed.on'];
  const airtimeFilter = [
    ...withdrawFilter,
    'confirmed.You',
    'bought',
    'airtime',
  ];
  var words = message.split(' ');

  switch (type) {
    case sent:
      // console.log(message)
      return words.filter(word => !sentFilter.includes(word));
    case receive:
      // console.log(message)
      return words.filter(word => !receiveFilter.includes(word));
    case accountPaid:
      // console.log(message)
      return words.filter(x => !accountPaidFilter.includes(x));
    case goodsPaid:
      // console.log(message)
      return words.filter(word => !goodsPaidFilter.includes(word));
    case withdraw:
      // console.log(message)
      return words.filter(word => !withdrawFilter.includes(word));
    case deposit:
      // console.log(message)
      return words.filter(word => !depositFilter.includes(word));
    case airtime:
      // console.log(message)
      return words.filter(word => !airtimeFilter.includes(word));
    case reverse:
      // console.log(message)
      return words.filter(word => !reverseFilter.includes(word));
    default:
      console.log('Error');
      return 'Nothing to filer here';
  }
}

// cashStructure removes the currency and converts the string into number format
function currencyToNumber(cash) {
  try {
    const currency = parseInt(cash.replace('Ksh', '').replace(',', ''));
    // break;
    // console.log(currency)
    return currency;
  } catch (err) {
    // console.log(err);
    return NaN;
  }
}

function dateConverter(date) {
  var neWdate = date.split('/');
  return neWdate[1] + '/' + neWdate[0] + '/' + neWdate[2];
}

// function nameTitleCase(names){
//   return _.startCase(_.toLower(names));
// }

function nameCapitalize(names) {
  return names.toUpperCase();
}
