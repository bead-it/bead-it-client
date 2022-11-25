import http from 'http';
import https from 'https';
import API from './commonprotocol';

const getPageData = async src => {
  const response = await API({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_PROXY_URL}/${src}`,
    headers: {
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  });

  if (response.result === 'error') {
    return response;
  }

  return {
    result: 'ok',
    data: response,
  };
};

export default getPageData;
