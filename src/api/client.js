import {create} from 'apisauce';

const apiClient = create({
  baseURL: 'https://jsonstorewithjson.herokuapp.com/api',
});

export default apiClient;
