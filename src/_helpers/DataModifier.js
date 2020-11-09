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

// let newDirectory = Object.values(directory.reduce((acc, item) => {
//     if (!acc[item.name]) acc[item.name] = {
//         name: item.name,
//         job: []
//     };
//     acc[item.name].job.push(item.job);
//     return acc;
// }, {}))