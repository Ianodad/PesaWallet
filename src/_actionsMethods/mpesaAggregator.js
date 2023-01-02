import _ from 'lodash';

// export const mpesaAggregator = () => {
//   const transactionTypes = {
//     sent: 'Sent',
//     received: 'Receive',
//     paybill: 'PayBill',
//     buyGoods: 'BuyGoods',
//     withdraw: 'Withdraw',
//   };

//   const data = [];
//   for (const [type, value] of Object.entries(transactionTypes)) {
//     const transactions = messageCollection.filter(type => type.TYPE === value);
//     const totalAmount = transactions.reduce(
//       (acc, type) => acc + type.AMOUNT,
//       0,
//     );
//     const dataObject = {
//       TYPE: value,
//       AMOUNT: totalAmount,
//       LENGTH: transactions.length,
//     };
//     data.push(dataObject);
//   }

//   return data;
// };

export const mpesaAggregator = messageCollection => {
  const transactionTypes = {
    sent: 'Sent',
    received: 'Receive',
    paybill: 'PayBill',
    buyGoods: 'BuyGoods',
    withdraw: 'Withdraw',
  };

  const data = [];
  for (const value of Object.values(transactionTypes)) {
    const transactions = messageCollection.filter(type => type.TYPE === value);
    const totalAmount = transactions.reduce(
      (acc, type) => acc + type.AMOUNT,
      0,
    );
    const dataObject = {
      TYPE: value,
      AMOUNT: totalAmount,
      LENGTH: transactions.length,
    };
    data.push(dataObject);
  }

  return data;
};

// export const mpesaAggregator = messageCollection => {
//   const groupedMessages = _.groupBy(messageCollection, 'TYPE');
//   console.log('messageCollections', groupedMessages);
//   const data = {};

//   for (const [type, messages] of Object.entries(groupedMessages)) {
//     data[type] = {
//       AMOUNT: _.sumBy(messages, 'AMOUNT'),
//       LENGTH: messages.length,
//     };
//   }

//   return data;
// };
