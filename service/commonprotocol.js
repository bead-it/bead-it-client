import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 2000,
});

const responseHandler = response => {
  if (response.status === 204) {
    return {
      result: 'ok',
    };
  }

  const received = response.data;
  return received;
};

const errorHandler = error => {
  if (error.response) {
    const received = error.response.data;

    return received;
  }

  const response = {
    result: 'error',
    error,
  };

  return response;
};

API.interceptors.response.use(responseHandler, errorHandler);

export default API;
