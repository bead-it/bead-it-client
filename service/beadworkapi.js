import API from './commonprotocol';

const getBeadworkData = async (userId, beadworkId, token) => {
  return API({
    method: 'get',
    url: `users/${userId}/beadworks/${beadworkId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const postBeadworkData = async () => {};

export { getBeadworkData, postBeadworkData };
