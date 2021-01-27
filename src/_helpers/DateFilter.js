var dayjs = require('dayjs');
var isBetween = require('dayjs/plugin/isBetween');
var _ = require('lodash');

dayjs.extend(isBetween);

const today = dayjs(dayjs(new Date())).format('MM/DD/YY');

const filterPoint = (dataNew, startDate, endDate) => {
  const result = dataNew.filter((a) => {
    const date = a.DATE;
    return dayjs(date).isBetween(startDate, endDate, null, '[]');
    // console.log(date >= startDate && date <= endDate);
    // return date >= startDate && date <= endDate;
  });
  // console.log(result);
  return result;
};

export const dayGroup = (data) => {
  const DATA = Object.values(
    data.reduce((acc, item) => {
    //   console.log(acc);
      if (!acc[item.DATE]) {
        acc[item.DATE] = {
          title: dayjs(item.DATE).format('MMM D'),
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

const weekGroup =  (data) => {
  const groups =  data.reduce((acc, item) => {

  startWeek = dayjs(item.DATE).day(0).format('DD/MM/YYYY');
  endWeek = dayjs(item.DATE).day(6).format('DD/MM/YYYY');
      // console.log(startWeek, endWeek);
  let titleStart = dayjs(item.DATE).day(0).format('MMM D');
  let titleEnd = dayjs(item.DATE).day(6).format('MMM D');
  let year = dayjs(item.DATE).format('YY');
  title = `${titleStart}-${titleEnd}/${year}`;
  // console.log(title)
  // const between = dayjs(item.DATE).isBetween(
  //       startWeek,
  //       dayjs(endWeek),
  //       null,
  //       '[]',
  //     );
  
  // add this key as a property to the result object
  if (!acc[title]) {
    acc[title] = {
          title: title,
          startWeek: dayjs(titleStart).format('MMM D'),
          endWeek: dayjs(titleEnd).format('MMM D'),
          year: dayjs(item.DATE).format('YYYY'),
          data: [],
      };
    } 
  //  acc[title].data = [...item]  
  acc[title].data.push(item);
  return acc;

  }, {});

//  console.log(groups)
 return Object.values(groups)
};

const monthGroup = (data) => {
  let title;
  let month;
  const DATA = Object.values(
    data.reduce((acc, item) => {
      title = dayjs(item.DATE).format('MMM YY');
      month = dayjs(item.DATE).format('MMMM');
      if (!acc[title]) {
        acc[title] = {
          title: title,
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
  let title;
  let year;
  const DATA = Object.values(
    data.reduce((acc, item) => {
      title = dayjs(item.DATE).format('YYYY');
      // const month = dayjs(item.DATE).format("MMMM")
      if (!acc[title]) {
        acc[title] = {
          title: title,
          data: [],
        };
      }
      acc[title].data.push(item);
      return acc;
    }, {}),
  );
  return DATA;
};

export const DateFilter = (dataNew, range) => {
  // console.log(range);
  switch (range) {
    case 'hour':
      break;
    case 'day':
      return dayGroup(dataNew)
      // return dataNew.filter((a) => a.DATE === today);
    case 'week':
      // const startWeek = dayjs(today).subtract(1, 'Week').format('MM/DD/YYYY');
      // const week = weekGroup(dataNew);
      // console.log(_.get(week,'[0].data'))
      return weekGroup(dataNew);
    // return filterPoint(dataNew, startWeek, today);
    case 'month':
      // const startMonth = dayjs(today).subtract(1, 'Month').format('MM/DD/YYYY');
      return monthGroup(dataNew);
    // console.log(filterPoint(dataNew, startMonth, today));
    // return filterPoint(dataNew, startMonth, today);
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
      return yearGroup(dataNew);
    // return filterPoint(dataNew, startYear, today);
    case 'max':
      return dataNew;
    default:
      return null;
  }
};
