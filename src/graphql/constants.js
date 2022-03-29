import axios from 'axios';
import {allUsers} from './queries';

export const getAllUsers = async () => {
  // let response = await graphql.post('graphql', {query: allUsers});
  console.log('This is graphql data');
  // const {data} = response;
  // console.log(response);
  // console.log(data);
  await axios({
    url: 'http://10.0.2.2:5000/api/graphql',
    method: 'post',
    mode: 'cors',
    headers: {
      // 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      // 'Content-Type': 'application/json',
    },
    withCredentials: true,
    // credentials: 'same-origin',
    data: {
      query: allUsers`
    {
     allUsers{
      name
     }
    }
    `,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const createUserWithGoogleSign = async () => {
  
}