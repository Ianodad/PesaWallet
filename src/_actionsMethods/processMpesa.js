const sent = 'sent';
const receive = 'receive';
const accountPaid = 'account';
const goodsPaid = 'paid';
const deposit = 'Give';
const withdraw = ['PMWithdraw', 'AMWithdraw'];
const airtime = 'of airtime';
const reverse = 'Reversal';
const failed = 'Failed.';

export const processMpesa = (mpesaData) => {
  // // holds all proceeded sent cash transactions
  let sentData = [];
  // holds all proceeded receive cash transactions
  let receiveData = [];
  // //holds all processed playbills account cash transactions
  let accountData = [];
  // //holds all proceeded paid goods cash transactions
  let goodsPaidData = [];
  // // holds all processed withdrawn data transactions
  let withdrawData = [];
  // // holds all deposit cash transactions
  let depositData = [];
  // // holds all airtime bought through mpesa
  let airtimeData = [];
  // // holds all reversed transactions
  let reversedData = [];

  mpesaData.map((textMessage) => {
    const {body} = textMessage;
    if (body.includes(sent) && !body.includes(accountPaid)) {
      //   console.log(body);
        sentData = [...sentData, (processSent(body, sent))]
    } else if (body.includes(receive)) {
      // console.log(body)
      receiveData = [...receiveData, processReceived(body, receive)];
    } else if (
      body.includes(accountPaid) &&
      !body.includes(reverse) &&
      !body.includes('now active') &&
      !body.includes('request') &&
      !body.includes('account balance') &&
      !body.includes('enough money') &&
      !body.includes('Failed.')
    ) {
    //   console.log(body)
      accountData = [...accountData, processAccountPaid(body, accountPaid)]
    } else if (body.includes(goodsPaid)) {
      //console.log(body)
      goodsPaidData = [...goodsPaidData, processGoodsPaid(body, goodsPaid)];
    } else if (body.includes(deposit)) {
      //console.log(body)
      depositData = [...depositData, processDeposit(body, deposit)]
    } else if (withdraw.some((word) => body.includes(word))) {
      //console.log(body)
      withdrawData = [...withdrawData, processWithdraw(body, withdraw)]
    } else if (body.includes(airtime)) {
      //console.log(body)
      airtimeData =  [...airtimeData, processAirtime(body, airtime)]
    } else if (body.includes(reverse)) {
      //console.log(body)
       reversedData = [...reversedData, processReversed(body, reverse)]
    } else {
      // console.log(body)
      // console.log("message cant be processed")
      return null;
    }
  });
//   console.log(sentData);
//   console.log(receiveData);
//   console.log(accountData);
//   console.log(goodsPaidData);
//   console.log(withdrawData);
//   console.log(depositData);
//   console.log(airtimeData);
//   console.log(reversedData);
  const processData = {
    sentData,
    receiveData,
    accountData,
    goodsPaidData,
    withdrawData,
    depositData,
    airtimeData,
    reversedData,
  } 
  return processData
};

// This is function takes in message and type message to processed and cleaned
function processSent(message, sent) {
  // cleanedSend takes in filtered and type to clean data
  return cleanedSend(filterContent(message, sent), sent);
}

function processReceived(message, receive) {
  return cleanedReceive(filterContent(message, receive), receive);
}

function processAccountPaid(message, accountPaid) {
  return cleanedAccountPaid(filterContent(message, accountPaid), accountPaid);
}

function processGoodsPaid(message, goodsPaid){
  return cleanedGoodsPaid(filterContent(message, goodsPaid), goodsPaid)
}

function processDeposit(message, deposit) {
  return cleanedDeposit(filterContent(message, deposit), deposit);
}

function processWithdraw(message, withdraw) {
  return cleanedWithdraw(filterContent(message, withdraw), withdraw);
}

function processAirtime(message, airtime) {
  return cleanedAirtime(filterContent(message, airtime), airtime);
}
function processReversed(message, reverse) {
  return cleanReverse(filterContent(message, reverse), reverse);
}

function cleanedSend(clean) {
  const ID = cleanSwitch(clean, 'ID');
  let PHONENO = cleanSwitch(clean, 'PHONENO');
  const DATE = cleanSwitch(clean, 'DATE');

  const SENTMONEY = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
  const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
  const COST = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[2]);

  const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')}`;

  let FULLNAME;
  if (PHONENO) {
    FULLNAME = nameCapitalize(
      clean
        .slice(
          clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
          clean.indexOf(PHONENO),
        )
        .join(' '),
    );
  } else {
    FULLNAME = nameCapitalize(
      clean
        .slice(
          clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
          clean.indexOf(DATE),
        )
        .join(' '),
    );
    PHONENO = NaN;
  }

  const data = {
    ID,
    SENTMONEY,
    FULLNAME,
    PHONENO,
    TIME,
    DATE,
    BALANCE,
    COST,
  };
  // console.log(data)
  return data;
}

function cleanedReceive(clean) {
  const ID = cleanSwitch(clean, 'ID');
  let PHONENO = cleanSwitch(clean, 'PHONENO');
  const DATE = cleanSwitch(clean, 'DATE');
  const RECEIVEMONEY = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
  const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
  const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')}`;

  let FULLNAME;
  if (PHONENO) {
    FULLNAME = nameCapitalize(
      clean
        .slice(
          clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
          clean.indexOf(PHONENO),
        )
        .join(' '),
    );
  } else {
    FULLNAME = nameCapitalize(
      clean
        .slice(
          clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
          clean.indexOf(DATE),
        )
        .join(' '),
    );
    PHONENO = NaN;
  }

  const data = {
    ID,
    RECEIVEMONEY,
    FULLNAME,
    PHONENO,
    TIME,
    DATE,
    BALANCE,
  };
  return data
}

function cleanedAccountPaid(clean) {
  const ID = cleanSwitch(clean, 'ID');
  const DATE = cleanSwitch(clean, 'DATE');
  let PHONENO = cleanSwitch(clean, 'PHONENO');
  const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')}`;
  const PAIDAMOUNT = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
  const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
  const COST = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[2]);

  let ACCOUNTNAME;

  if (PHONENO) {
    ACCOUNTNAME = nameCapitalize(
      clean
        .slice(
          clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
          clean.indexOf(PHONENO),
        )
        .join(' '),
    );
  } else {
    ACCOUNTNAME = nameCapitalize(
      clean
        .slice(
          clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
          clean.indexOf(DATE),
        )
        .join(' '),
    );
  }

  const data = {
    ID,
    PAIDAMOUNT,
    ACCOUNTNAME,
    TIME,
    DATE,
    BALANCE,
    COST,
  };
  return data
}

function cleanedGoodsPaid(clean){
  const ID = cleanSwitch(clean, 'ID')
  const DATE = cleanSwitch(clean, 'DATE')
  let PHONENO = cleanSwitch(clean, 'PHONENO')
  const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM').match(/^[AM|PM]{2}/).join('')}`
  const PAIDAMOUNT = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0])
  const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1])
  const COST = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[2])

  let ACCOUNTNAME
  
  if (PHONENO) {
    ACCOUNTNAME = nameCapitalize(clean.slice(clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0])+1, clean.indexOf(PHONENO) ).join(' '));
  } else {
    ACCOUNTNAME =  nameCapitalize(clean.slice(clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0])+1, clean.indexOf(DATE)).join(' '))
  }

  // console.log(ACCOUNTNAME)
  
  const data =  {
    ID,
    PAIDAMOUNT,
    ACCOUNTNAME,
    TIME,
    DATE,
    BALANCE,
    COST
  };
//   console.log(data)
  return data
}

function cleanedDeposit(clean) {
  const ID = cleanSwitch(clean, 'ID');
  const DATE = cleanSwitch(clean, 'DATE');
  let PHONENO = cleanSwitch(clean, 'PHONENO');
  const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')}`;
  const DEPOSITEDMONEY = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
  const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);

  let AGENTNAME;

  if (PHONENO) {
    AGENTNAME = nameCapitalize(
      clean
        .slice(
          clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
          clean.indexOf(PHONENO),
        )
        .join(' '),
    );
  } else {
    AGENTNAME = nameCapitalize(
      clean
        .slice(
          clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
          clean.indexOf(cleanSwitch(clean, 'ALLCASH')[1]),
        )
        .join(' '),
    );
  }

  const data = {
    ID,
    DEPOSITEDMONEY,
    AGENTNAME,
    TIME,
    DATE,
    BALANCE,
  };
  return data
}

function cleanedWithdraw(clean) {
  const ID = cleanSwitch(clean, 'ID');
  const DATE = cleanSwitch(clean, 'DATE');
  let PHONENO = cleanSwitch(clean, 'PHONENO');
  const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')
    .match(/^[AM|PM]{2}/)
    .join('')}`;
  const WITHDRAWNMONEY = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
  const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
  const AGENTNO = clean[clean.indexOf('-') - 1];

  let AGENTNAME
  if (PHONENO) {
    AGENTNAME = nameCapitalize(
      clean
        .slice(
          clean.indexOf(cleanSwitch(clean, 'ALLCASH')[0]) + 1,
          clean.indexOf(PHONENO),
        )
        .join(' '),
    );
  } else {
    AGENTNAME = nameCapitalize(
      clean
        .slice(
          clean.indexOf('-') + 1,
          clean.indexOf(cleanSwitch(clean, 'ALLCASH')[1]),
        )
        .join(' '),
    );
  }

  // console.log(AGENTNAME)

  const data = {
    ID,
    WITHDRAWNMONEY,
    AGENTNO,
    AGENTNAME,
    TIME,
    DATE,
    BALANCE,
  };
//   console.log(data);
    return data
}

function cleanedAirtime(clean) {
  const ID = cleanSwitch(clean, 'ID');
  const DATE = cleanSwitch(clean, 'DATE');
  let PHONENO = cleanSwitch(clean, 'PHONENO');
  const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')
    .match(/^[AM|PM]{2}/)
    .join('')}`;
  const AMOUNTBOUGHT = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[0]);
  const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);
  const COST = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[2]);

  console.log(COST);

  const data = {
    ID,
    AMOUNTBOUGHT,
    PHONENO,
    TIME,
    DATE,
    BALANCE,
    COST,
  };
  // console.log(data)
  return data
}

function cleanReverse(clean) {
  const ID = cleanSwitch(clean, 'ALLIDS')[0];
  const TRANSACTION_ID = cleanSwitch(clean, 'ALLIDS')[1];
  const DATE = cleanSwitch(clean, 'DATE');
  const TIME = `${cleanSwitch(clean, 'TIME')} ${cleanSwitch(clean, 'AMPM')}`;
  const REVERSALAMOUNT = cleanSwitch(clean, 'ALLCASH')[0];
  const BALANCE = currencyToNumber(cleanSwitch(clean, 'ALLCASH')[1]);

  const data = {
    ID,
    TRANSACTION_ID,
    DATE,
    TIME,
    REVERSALAMOUNT,
    BALANCE,
  };

//   console.log(data);
  return data
}

function cleanSwitch(clean, type) {
  const regexID = /[0-9a-zA-Z]{10}/; // get ID
  const regexPhoneNo = /^[07|+254|254][0-9]{9}/; // Phone number
  const regexName = /([A-Z])\w+/;
  const regexDate = /\//;
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
  return array.find((element) => element.match(regex));
}

function cleanFilter(array, regex) {
  return array.filter((element) => element.match(regex));
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

  const accountPaidFilter = [...sentFilter, 'cost', 'account', 'for'];

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
      return words.filter((word) => !sentFilter.includes(word));
      break;
    case receive:
      // console.log(message)
      return words.filter((word) => !receiveFilter.includes(word));
      break;
    case accountPaid:
      // console.log(message)
      return words.filter((x) => !accountPaidFilter.includes(x));
      break;
    case goodsPaid:
      // console.log(message)
      return words.filter((word) => !goodsPaidFilter.includes(word));
      break;
    case withdraw:
      // console.log(message)
      return words.filter((word) => !withdrawFilter.includes(word));
      break;
    case deposit:
      // console.log(message)
      return words.filter((word) => !depositFilter.includes(word));
      break;
    case airtime:
      // console.log(message)
      return words.filter((word) => !airtimeFilter.includes(word));
      break;
    case reverse:
      // console.log(message)
      return words.filter((word) => !reverseFilter.includes(word));
    default:
      console.log('Error');
      return 'Nothing to filer here';
      break;
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
// function nameTitleCase(names){
//   return _.startCase(_.toLower(names));
// }

function nameCapitalize(names) {
  return names.toUpperCase();
}
