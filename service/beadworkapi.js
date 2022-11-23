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

const postBeadworkData = async (userId, token) => {
  return API({
    method: 'post',
    url: `users/${userId}/beadworks`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const postBeadworkDataFromBeads = async (
  userId,
  beadworkId,
  token,
  selectedBeads,
) => {
  return API({
    method: 'post',
    url: `users/${userId}/beadworks/${beadworkId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      selectedBeads,
    },
  });
};

export { getBeadworkData, postBeadworkData, postBeadworkDataFromBeads };
