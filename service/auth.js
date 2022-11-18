import jwt from 'jsonwebtoken';
import { deleteCookie, setCookie } from 'cookies-next';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import API from './commonprotocol';
import errorHandler from '../utils/errorhandler';

const login = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const signInResult = await signInWithPopup(auth, provider);

    const { _tokenResponse: token } = signInResult;
    const { oauthIdToken: idToken, oauthAccessToken: accessToken } = token;

    const loginResponse = await errorHandler(async () => {
      const response = await API({
        method: 'post',
        url: '/login',
        data: {
          accessToken,
          idToken,
        },
      });

      return response;
    });

    const { beaditToken } = loginResponse;
    const user = jwt.verify(beaditToken, process.env.SECRET_KEY);

    setCookie('beaditToken', beaditToken, { secure: false });

    console.log(beaditToken, user);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

const logout = async () => {
  await auth.signOut();
  deleteCookie('beaditToken');
};

export { login, logout };
