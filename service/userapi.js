import API from './commonprotocol';

const getUserData = async (userId, token) => {
  return API({
    methd: 'get',
    url: `/users/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const patchUserData = async () => {};

export { getUserData, patchUserData };
