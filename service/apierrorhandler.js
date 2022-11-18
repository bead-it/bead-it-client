import { deleteCookie } from 'cookies-next';
import refreshUser from '../utils/refreshuser';

const apiErrorHandler = async (
  apiExecFunc,
  errorCallback = null,
  helperFuncs = {},
) => {
  try {
    const apiExecResult = await apiExecFunc();

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

      if (errorCallback) {
        errorCallback(apiExecResult);
      }

      return apiExecResult;
    }

    return apiExecResult.data;
  } catch (error) {
    error.message = `Error in SERVER request${
      process.env.NODE_ENV === 'development' ? ` : ${error.message}` : ''
    }.`;
    error.status = 500;
    console.error(error);

    return null;
  }
};

export default apiErrorHandler;
