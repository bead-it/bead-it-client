import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 2000,
});

const responseHandler = response => {
  if (response.status === 204) {
    return {
      result: 'ok',
      data: 'none',
    };
  }

  return response.data;
};

const errorHandler = error => {
  let received;
  if (error.response) {
    received = error.response.data;
  } else {
    received = {
      result: 'error',
      message: error.message,
      code: error.code,
    };
  }

  return received;
};

API.interceptors.response.use(responseHandler, errorHandler);

export default API;
