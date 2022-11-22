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

const postThreadData = async (
  userId,
  beadworkId,
  token,
  sourceBeadId,
  targetBeadId,
) => {
  console.log(sourceBeadId, targetBeadId);
  return API({
    method: 'post',
    url: `/users/${userId}/beadworks/${beadworkId}/threads`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      source: sourceBeadId,
      target: targetBeadId,
    },
  });
};

export { getAllThreadsData, getThreadData, postThreadData };
