import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1500,
});

const responseHandler = response => {
  const received = response.data;

  return received;
};

// const errorHandler = () => {};

API.interceptors.response.use(responseHandler);

export default API;
