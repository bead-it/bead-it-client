import { getCookie } from 'cookies-next';

const refreshUser = setToken => {
  if (process.env.NODE_ENV === 'development') {
    console.log('examining token!!');
  }

  const token = getCookie('beaditToken');

  setToken(token);
};

export default refreshUser;
