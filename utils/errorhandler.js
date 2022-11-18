import { deleteCookie } from 'cookies-next';
import refreshUser from './refreshuser';

const errorHandler = async (
  execFunc,
  errorCallback = null,
  helperFuncs = {},
) => {
  const execResult = await execFunc();

  if (execResult.result === 'error') {
    if (execResult.code === 401) {
      deleteCookie('beaditToken');
      window.alert('Your authentication has expired!! Please sign in first!!');

      if (!helperFuncs.setToken) {
        throw new Error('No required helperFunction : setToken');
      }
      refreshUser(helperFuncs.setToken);
    }

    if (errorCallback) {
      errorCallback(execResult);
    }

    return execResult;
  }

  return execResult.data;
};

export default errorHandler;
