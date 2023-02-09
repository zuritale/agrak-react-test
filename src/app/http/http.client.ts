import axios, { type AxiosInstance } from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-type': 'application/json'
  }
});

export default httpClient;
