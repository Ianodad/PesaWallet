import {create} from 'apisauce';
const GRAPHQL_API = 'https://api.github.com/graphql';
// http://localhost:5000/api/graphql
// define base api url the export it as a global variable
const graphql = create({
  baseURL: 'http://10.0.2.2:5000/api/graphql',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  credentials: 'same-origin',
});
// console.log(graphql);

export default graphql;
