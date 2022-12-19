var dayjs = require('dayjs');
var isBetween = require('dayjs/plugin/isBetween');
var _ = require('lodash');

dayjs.extend(isBetween);

const today = dayjs(dayjs(new Date())).format('MM/DD/YY');

const filterPoint = (dataNew, startDate, endDate) => {
  const result = dataNew.filter(a => {
    const date = a.DATE;
    return dayjs(date).isBetween(startDate, endDate, null, '[]');
    // console.log(date >= startDate && date <= endDate);
    // return date >= startDate && date <= endDate;
  });
  // console.log(result);
  return result;
};

const hourGroup = data => {
  // Get the current hour
  const hour = dayjs().hour();

  // Filter the data to only include records from the current hour
  const filteredData = data.filter(item => {
    const itemHour = dayjs(item.DATE).hour();
    return itemHour === hour;
  });

  // Return the filtered data
  return filteredData;
};

export const dayGroup = data => {
  if (data.length <= 1) return data;
  const result = new Map();
  data.forEach(item => {
    let title = dayjs(item.DATE).format('MMM DD YYYY');
    let id = dayjs(title).unix();
    if (!result.has(id)) {
      result.set(id, {
        id: id,
        title: dayjs(title).format('MMM D'),
        name: dayjs(title).format('MMM D'),
        year: dayjs(title).format('YYYY'),
        data: [],
      });
    }
    result.get(id).data.push(item);
  });
  return Array.from(result.values());
};

// const weekGroup = data => {
//   const groups = data.reduce((acc, item) => {
//     startWeek = dayjs(item.DATE).day(0).format('DD/MM/YYYY');
//     endWeek = dayjs(item.DATE).day(6).format('DD/MM/YYYY');
//     // console.log(startWeek, endWeek);
//     let titleStart = dayjs(item.DATE).day(0).format('MMM D YYYY');
//     let titleEnd = dayjs(item.DATE).day(6).format('MMM DD YYYY');
//     let year = dayjs(item.DATE).format('YYYY');
//     let id = dayjs(titleEnd).unix();
//     title = `${titleStart} to ${titleEnd}/${year}`;

//     // add this key as a property to the result object
//     if (!acc[id]) {
//       acc[id] = {
//         id: id,
//         title: title,
//         name: `${dayjs(titleStart).format('MMM D')} - ${dayjs(titleEnd).format(
//           'MMM D',
//         )}`,
//         startWeek: dayjs(titleStart).format('MMM D'),
//         endWeek: dayjs(titleEnd).format('MMM D'),
//         year: dayjs(item.DATE).format('YYYY'),
//         data: [],
//       };
//     }
//     //  acc[title].data = [...item]
//     acc[id].data.push(item);
//     return acc;
//   }, {});

//   //  console.log(groups)
//   return Object.values(groups);
// };

const weekGroup = data => {
  const groups = data.reduce((acc, item) => {
    // Use dayjs to get the start and end dates of the week
    const startWeek = dayjs(item.DATE).day(0).format('DD/MM/YYYY');
    const endWeek = dayjs(item.DATE).day(6).format('DD/MM/YYYY');

    // Use dayjs to get the start and end dates of the week for the title
    const titleStart = dayjs(item.DATE).day(0).format('MMM D YYYY');
    const titleEnd = dayjs(item.DATE).day(6).format('MMM DD YYYY');

    // Use dayjs to get the year for the title
    const year = dayjs(item.DATE).format('YYYY');

    // Use dayjs to get the Unix timestamp for the ID
    const id = dayjs(titleEnd).unix();

    // Create the title using the start and end dates and the year
    const title = `${titleStart} to ${titleEnd}/${year}`;

    // If the ID doesn't exist in the result object, add it as a property
    if (!acc[id]) {
      acc[id] = {
        id,
        title,
        name: `${dayjs(titleStart).format('MMM D')} - ${dayjs(titleEnd).format(
          'MMM D',
        )}`,
        startWeek: dayjs(titleStart).format('MMM D'),
        endWeek: dayjs(titleEnd).format('MMM D'),
        year: dayjs(item.DATE).format('YYYY'),
        data: [],
      };
    }

    // Add the current item to the data array for the current ID
    acc[id].data.push(item);

    return acc;
  }, {});

  // Return the values from the result object as an array
  return Object.values(groups);
};

// const weekGroup = data => {
//   // Use a map to store groups, with the group id as the key
//   const groups = new Map();

//   data.forEach(item => {
//     // Calculate the start and end of the week
//     const startWeek = dayjs(item.DATE).day(0).format('DD/MM/YYYY');
//     const endWeek = dayjs(item.DATE).day(6).format('DD/MM/YYYY');

//     // Calculate the title of the group
//     const titleStart = dayjs(item.DATE).day(0).format('MMM D YYYY');
//     const titleEnd = dayjs(item.DATE).day(6).format('MMM DD YYYY');
//     const year = dayjs(item.DATE).format('YYYY');
//     const id = dayjs(titleEnd).unix();
//     const title = `${titleStart} to ${titleEnd}/${year}`;

//     // Check if a group for this id already exists
//     let group = groups.get(id);
//     if (!group) {
//       // Create a new group if it doesn't exist
//       group = {
//         id: id,
//         title: title,
//         name: `${dayjs(titleStart).format('MMM D')} - ${dayjs(titleEnd).format(
//           'MMM D',
//         )}`,
//         startWeek: dayjs(titleStart).format('MMM D'),
//         endWeek: dayjs(titleEnd).format('MMM D'),
//         year: dayjs(item.DATE).format('YYYY'),
//         data: [],
//       };
//       groups.set(id, group);
//     }

//     // Add the current item to the group's data
//     group.data.push(item);
//   });

//   // Return the values of the map as an array
//   return Array.from(groups.values());
// };

// const monthGroup = data => {
//   let title;
//   let month;
//   const DATA = Object.values(
//     data.reduce((acc, item) => {
//       title = dayjs(item.DATE).format('MMM YYYY');
//       month = dayjs(item.DATE).format('MMMM');
//       id = dayjs(title).unix();
//       if (!acc[id]) {
//         acc[id] = {
//           id: id,
//           title: title,
//           name: dayjs(title).format('MMM YY'),
//           month: month,
//           year: dayjs(title).format('YYYY'),
//           data: [],
//         };
//       }
//       acc[id].data.push(item);
//       return acc;
//     }, {}),
//   );
//   // console.log(DATA)
//   return DATA;
// };

const monthGroup = data => {
  return data.reduce((acc, item) => {
    const title = dayjs(item.DATE).format('MMM YYYY');
    const month = dayjs(item.DATE).format('MMMM');
    const id = dayjs(title).unix();
    if (!acc[id]) {
      acc[id] = {
        id: id,
        title: title,
        name: dayjs(title).format('MMM YY'),
        month: month,
        year: dayjs(title).format('YYYY'),
        data: [],
      };
    }
    acc[id].data.push(item);
    return acc;
  }, {});
};

// const yearGroup = data => {
//   let title;
//   let year;
//   const DATA = Object.values(
//     data.reduce((acc, item) => {
//       if (item != null) {
//         try {
//           // console.log(item.DATE);
//           title = dayjs(item.DATE).format('YYYY');
//           id = dayjs(title).unix();
//           // const month = dayjs(item.DATE).format("MMMM")
//           console.log('check', !acc[id]);
//           if (!acc[id]) {
//             acc[id] = {
//               id: id,
//               title: title,
//               name: title,
//               year: dayjs(title).format('YYYY'),
//               data: [],
//             };
//           }
//           acc[id].data.push(item);
//           return acc;
//         } catch (error) {
//           console.log(error);
//           console.log('item', item.DATE, dayjs(item.DATE).format('YYYY'));
//         }
//       }
//     }, {}),
//   );
//   return DATA;
// };

const yearGroup = data => {
  // Create an array to hold the year arrays
  const years = [];

  // Iterate over the data array
  data.forEach(item => {
    if (item != null) {
      try {
        // Extract the year from the item's date
        const year = new Date(item.DATE).getFullYear();

        // Check if a year array already exists for this year
        let yearArray = years.find(y => y.year === year);
        if (!yearArray) {
          // If not, create a new year array
          yearArray = {
            year: year,
            data: [],
          };
          years.push(yearArray);
        }

        // Add the item to the year array
        yearArray.data.push(item);
      } catch (error) {
        console.log(error);
        console.log('item', item.DATE, dayjs(item.DATE).format('YYYY'));
      }
    }
  });
  return years;
};


export const DateFilter = (dataNew, range) => {
  if (range === 'hour') {
    // Return something for the 'hour' case
    return hourGroup(dataNew);
  } else if (range === 'day') {
    return dayGroup(dataNew);
  } else if (range === 'week') {
    return weekGroup(dataNew);
  } else if (range === 'month') {
    return monthGroup(dataNew);
  } else if (range === 'threeMonths') {
    const start3Months = dayjs(today).subtract(3, 'Month').format('MM/DD/YYYY');
    return filterPoint(dataNew, start3Months, today);
  } else if (range === 'sixMonths') {
    const start6Months = dayjs(today).subtract(6, 'Month').format('MM/DD/YYYY');
    return filterPoint(dataNew, start6Months, today);
  } else if (range === 'year') {
    const startYear = dayjs(today).subtract(1, 'Year').format('MM/DD/YYYY');
    return yearGroup(dataNew);
  } else if (range === 'max') {
    return dataNew;
  } else {
    return null;
  }
};
