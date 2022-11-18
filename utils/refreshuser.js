import { getCookie } from 'cookies-next';

const refreshUser = setToken => {
  console.log('examining token!!');

  const token = getCookie('beaditToken');

  setToken(token);
};

export default refreshUser;
