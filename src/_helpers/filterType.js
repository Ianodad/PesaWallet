export const filterType = data => {
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
