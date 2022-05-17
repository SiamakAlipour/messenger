import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001/api',
  'content-type': 'application/json',
});

export default api;
