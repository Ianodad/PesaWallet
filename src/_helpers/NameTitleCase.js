const _ = require('lodash');

export const nameTitleCase = (names)=> {
  return _.startCase(_.toLower(names));
}