import {create} from 'apisauce';

const api = create({
  baseURL: 'https://rack-sevenstars.rhcloud.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api;
