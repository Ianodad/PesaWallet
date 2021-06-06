import axios from 'axios';

export const getAllUsers = async () => {
  // let response = await graphql.post('graphql', {query: allUsers});
  console.log('This is graphql data');
  // const {data} = response;
  // console.log(response);
  // console.log(data);
  await axios({
    url: 'http://localhost:5000/api/graphql',
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
      query: `
    {
     allUsers{
      name
     }
    }
    `,
    },
  })
    .then((res) => {
      console.log(res.data.data.allUsers);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
