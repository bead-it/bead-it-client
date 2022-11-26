import { deleteCookie, setCookie } from 'cookies-next';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import API from './commonprotocol';
import apiErrorHandler from './apierrorhandler';

const login = async router => {
  try {
    const provider = new GoogleAuthProvider();

    const signInResult = await signInWithPopup(auth, provider);

    const { _tokenResponse: token } = signInResult;
    const { oauthIdToken: idToken, oauthAccessToken: accessToken } = token;

    const loginResponse = await apiErrorHandler(
      async () => {
        const response = await API({
          method: 'post',
          url: '/login',
          data: {
            accessToken,
            idToken,
          },
        });

        return response;
      },
      errorResult => {
        window.alert(errorResult.message);
        return null;
      },
      { router },
    );

    if (!loginResponse) {
      return false;
    }

    const { beaditToken } = loginResponse;

    setCookie('beaditToken', beaditToken, { secure: false });

    return true;
  } catch (error) {
    if (process.env.NODE_ENV !== 'development') {
      router.push({
        pathname: '/error',
        query: { errorStatus: 500 },
      });

      return false;
    }

    error.message = `Error in LOGIN process : ${error.message}`;
    error.status = 500;
    console.error(error);

    return false;
  }
};

const logout = async () => {
  await auth.signOut();
  deleteCookie('beaditToken');
};

export { login, logout };
