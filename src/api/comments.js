import client from './client';

const endPoint = '/comments';
const getComments = () => client.get(endPoint);


export default {
  getComments,
};
