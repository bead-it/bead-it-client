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

const patchThreadData = async (userId, beadworkId, threadId, token, data) => {
  return API({
    method: 'patch',
    url: `/users/${userId}/beadworks/${beadworkId}/threads/${threadId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export { getAllThreadsData, getThreadData, postThreadData, patchThreadData };
