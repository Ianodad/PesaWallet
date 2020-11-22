var dayjs = require('dayjs');
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

const today = dayjs(dayjs(new Date())).format('MM/DD/YY');

const filterPoint = (dataNew, startDate, endDate) => {
  console.log(startDate, endDate);
  const result = dataNew.filter((a) => {
    const date = a.DATE;
    return dayjs(date).isBetween(startDate, endDate, null, '[]')
    // console.log(date >= startDate && date <= endDate);
    // return date >= startDate && date <= endDate;
  });
  // console.log(result);
  return result;
};

export const DateFilter = (dataNew, range, date, time) => {
  // console.log(range);
  switch (range) {
    case 'hour':
      break;
    case 'day':
      return dataNew.filter((a) => a.DATE === today);
    case 'week':
      const startWeek = dayjs(today).subtract(1, 'Week').format('MM/DD/YYYY');
      return filterPoint(dataNew, startWeek, today);
    case 'month':
      const startMonth = dayjs(today).subtract(1, 'Month').format('MM/DD/YYYY');
      // console.log(filterPoint(dataNew, startMonth, today));
      return filterPoint(dataNew, startMonth, today);
    case 'threeMonths':
      const start3Months = dayjs(today)
        .subtract(3, 'Month')
        .format('MM/DD/YYYY');
      return filterPoint(dataNew, start3Months, today);
    case 'sixMonths':
      const start6Months = dayjs(today)
        .subtract(6, 'Month')
        .format('MM/DD/YYYY');
      return filterPoint(dataNew, start6Months, today);
    case 'year':
      // const startYear = dayjs(today).startOf('year');
      const startYear = dayjs(today).subtract(1, 'Year').format('MM/DD/YYYY');
      return filterPoint(dataNew, startYear, today);
    case 'max':
      return dataNew;
    default:
      return null;
  }
};
