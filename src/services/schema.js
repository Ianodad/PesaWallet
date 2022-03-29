export const schema = [
  {
    name: 'Time',
    type: 'date',
    format: '%Y-%m-%d',
  },
  {
    name: 'Daily Visitors',
    type: 'number',
  },
];

export function getSchema() {
  return schema.filter((sch) => sch);
}
