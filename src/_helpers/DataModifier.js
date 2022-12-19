export const DataModifier = (data) => {
  const DATA = Object.values(
    data.reduce((acc, item) => {
    //   console.log(acc);
      if (!acc[item.DATE]) {
        acc[item.DATE] = {
          dateTitle: item.DATE,
          data: [],
        };
      }
      acc[item.DATE].data.push(item);
    //   console.log(acc);
      return acc;
    }, {}),
  );
  return DATA;
};

// const DataModifier = data => {
//   const dates = new Set(data.map(item => item.DATE));
//   const result = new Map();
//   for (const date of dates) {
//     result.set(
//       date,
//       data.filter(item => item.DATE === date),
//     );
//   }
//   return Array.from(result.entries()).map(([date, items]) => ({
//     dateTitle: date,
//     data: items,
//   }));
// };


// const DataModifier = data => {
//   const dates = new Set(data.map(item => item.DATE));
//   return [...dates].map(date => ({
//     dateTitle: date,
//     data: data.filter(item => item.DATE === date),
//   }));
// };

// const DataModifier = data => {
//   const dates = new Set(data.map(item => item.DATE));
//   const result = new Map();
//   for (const date of dates) {
//     result.set(
//       date,
//       data.filter(item => item.DATE === date),
//     );
//   }
//   return result;
// };

// let newDirectory = Object.values(directory.reduce((acc, item) => {
//     if (!acc[item.name]) acc[item.name] = {
//         name: item.name,
//         job: []
//     };
//     acc[item.name].job.push(item.job);
//     return acc;
// }, {}))