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

const postBeadData = async (userId, beadworkId, token, url) => {
  const targetUrlData = await API({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_PROXY_URL}/${url}`,
  });

  const domain = url.split('/')[2];
  const title = targetUrlData.split(/<\/?title>/g)[1] || 'untitled';
  const keywords = [];

  console.log(url, domain, title, keywords);

  return API({
    method: 'post',
    url: `/users/${userId}/beadworks/${beadworkId}/beads`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      url,
      domain,
      title,
      keywords,
    },
  });
};

export { getAllBeadsData, getBeadData, postBeadData };
