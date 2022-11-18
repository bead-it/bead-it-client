import API from './commonprotocol';

const getAllThreadsData = async (userId, beadworkId, token) => {
  return API({
    method: 'get',
    url: `/users/${userId}/beadworks/${beadworkId}/threads`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getThreadData = async () => {};

export { getAllThreadsData, getThreadData };
