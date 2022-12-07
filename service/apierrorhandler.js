import { deleteCookie } from 'cookies-next';
import refreshUser from '../utils/authutil/refreshuser';

const apiErrorHandler = async (
  apiExecFunc,
  errorCallback = null,
  helperFuncs = {},
) => {
  try {
    const apiExecResult = await apiExecFunc();
    if (apiExecResult.result === 'ok') {
      return apiExecResult.data;
    }

    if (apiExecResult.result === 'error') {
      if (apiExecResult.code === 401) {
        if (!helperFuncs.setToken) {
          throw new Error('No required helperFunction : setToken');
        }

        deleteCookie('beaditToken');
        window.alert(
          'Your authentication has expired!! Please sign in first!!',
        );

        refreshUser(helperFuncs.setToken);
      }

      if (errorCallback && process.env.NODE_ENV === 'development') {
        return errorCallback(apiExecResult);
      }

      helperFuncs.router.push({
        pathname: '/error',
        query: {
          errorStatus: apiExecResult.code === 404 ? 404 : 500,
        },
      });

      return null;
    }

    throw new Error('Unspecified error.');
  } catch (error) {
    if (process.env.NODE_ENV !== 'development') {
      helperFuncs.router.push({
        pathname: '/error',
        query: { errorStatus: 500 },
      });

      return null;
    }

    error.message = `Error in SERVER request : ${error.message}`;
    error.status = 500;
    console.error(error);

    return null;
  }
};

export default apiErrorHandler;
