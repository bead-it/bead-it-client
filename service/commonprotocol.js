import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1500,
});

const responseHandler = response => {
  const received = response.data;

  return received;
};

const errorHandler = error => {
  if (error.response) {
    const received = error.response.data;

    return received;
  }

  throw new Error(error);
};

API.interceptors.response.use(responseHandler, errorHandler);

export default API;
