var dayjs = require('dayjs');
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

const today = dayjs(dayjs(new Date())).format('MM/DD/YY');

const filterPoint = (dataNew, startDate, endDate) => {
  const result = dataNew.filter((a) => {
    const date = a.DATE;
    return dayjs(date).isBetween(startDate, endDate, null, '[]')
    // console.log(date >= startDate && date <= endDate);
    // return date >= startDate && date <= endDate;
  });
  // console.log(result);
  return result;
};

const weekGroup = (data) => {
  let startWeek;
  let endWeek;
  let title;
  let between;
  const DATA = Object.values(
    data.reduce((acc, item) => {
      startWeek = dayjs(item.DATE).day(0).format('DD/MM/YYYY');
      endWeek = dayjs(item.DATE).day(6).format('DD/MM/YYYY');
      // console.log()
      titleStart = dayjs(item.DATE).day(0).format('MMM D YY');
      titleEnd = dayjs(item.DATE).day(6).format('MMM D YY');
      title = `${titleStart}-${titleEnd}`;
      const between = dayjs(item.DATE).isBetween(
        startWeek,
        dayjs(endWeek),
        null,
        '[]',
      );

      if (!acc[title] && between) {
        acc[title] = {
          dateTitle: title,
          startWeek: dayjs(titleStart).format('MMM D'),
          endWeek: dayjs(titleEnd).format('MMM D'),
          data: [],
        };
      }
      acc[title].data.push(item);
      return acc;
    }, {}),
  );
  return DATA;
};

const monthGroup = (data) => {
    let title
    let month
  const DATA = Object.values(
    data.reduce((acc, item) => {
      
  const title = dayjs(item.DATE).format("MMMM YYYY")
  const month = dayjs(item.DATE).format("MMMM")
      if (!acc[title]) {
        acc[title] = {
          dateTitle: title,
          month: month,
          data: [],
          };     
        }
      acc[title].data.push(item);
      return acc;
    }, {}),
  );
  return DATA;
};

const yearGroup = (data) => {
    let title
    let year
  const DATA = Object.values(
    data.reduce((acc, item) => {
      
  const title = dayjs(item.DATE).format("YYYY")
  // const month = dayjs(item.DATE).format("MMMM")
      if (!acc[title]) {
        acc[title] = {
          yearTitle: title,
          data: [],
          };     
        }
      acc[title].data.push(item);
      return acc;
    }, {}),
  );
  return DATA;
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
      // return weekGroup(dataNew)
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
