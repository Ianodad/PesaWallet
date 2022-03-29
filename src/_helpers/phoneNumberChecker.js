export const phoneNumberChecker = accountNumber => {
  const number = accountNumber;

  const safaricomNumberRegexOld =
    /^((?:254|\+254|0)((?<xa>7(?:(?:[01249][0-9])|(?:5[7-9])|(6[8-9]))[0-9]{6})|(?<xb>1(?:(?:[1][0-1]))[0-9]{6})))$/;
  const safaricomNumberRegexNew =
    /(\+?254|0|^){1}[-. ]?[1]{1}([1-9]{1}[0-9]{1}|[9]{1}[0-2]{1})[0-9]{6}\z?/;

  const airtelNumberRegexOld =
    /^(?:254|\+254|0)?((?:(?:7(?:(?:3[0-9])|(?:5[0-6])|(8[5-9])))|(?:1(?:[0][0-2])))[0-9]{6})$/;
  const airtelNumberRegexNew =
    /(\+?254|0|^){1}[-. ]?[1]{1}([0-0]{1}[0-8]{1}|[9]{1}[0-2]{1})[0-9]{6}\z?/;

  const telkomRegex =
    /(\+?254|0|^){1}[-. ]?[7]{1}([7]{1}[0-9]{1}|[9]{1}[0-2]{1})[0-9]{6}\z?/;

  const oldSafaricomTest = safaricomNumberRegexOld.test(number);
  const newSafaricomTest = safaricomNumberRegexNew.test(number);
  // console.log(oldTest)

  const oldSAirtelTest = airtelNumberRegexOld.test(number);
  const newAirtelTest = airtelNumberRegexNew.test(number);

  const telkomTest = telkomRegex.test(number);

  if (oldSafaricomTest || newSafaricomTest) {
    return 'Mpesa';
  } else if (oldSAirtelTest || newAirtelTest) {
    return 'Airtel-M';
  } else if (telkomTest) {
    return 'T-Kash';
  } else {
    console.log('number not supported');
    return accountNumber ? accountNumber : 'Not Supported';
  }
};
