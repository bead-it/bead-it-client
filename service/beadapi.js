import API from './commonprotocol';

const getAllBeadsData = async (userId, beadworkId, token) => {
  return API({
    method: 'get',
    url: `/users/${userId}/beadworks/${beadworkId}/beads`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getBeadData = async () => {};

export { getAllBeadsData, getBeadData };
