import { selector } from 'recoil';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { beadsReceived, threadsReceived, token } from './atoms';
import beadingFunction from '../utils/beading';

const beadsData = selector({
  key: `beadsData/${v4()}`,
  get: ({ get }) => {
    const beads = get(beadsReceived);
    const beadsMap = {};

    beads.forEach(bead => {
      const { _id: tempId } = bead;
      beadsMap[tempId] = bead;
    });

    return beadsMap;
  },
});

const threadsData = selector({
  key: `threadsData/${v4()}`,
  get: ({ get }) => {
    const threads = get(threadsReceived);
    const threadsMap = {};

    threads.forEach(thread => {
      const { _id: tempId } = thread;
      threadsMap[tempId] = thread;
    });

    return threadsMap;
  },
});

const beading = selector({
  key: `beading/${v4()}`,
  get: ({ get }) => {
    const beads = get(beadsReceived);
    const threads = get(threadsReceived);

    return beadingFunction(beads, threads);
  },
});

const userInfo = selector({
  key: `userInfo/${v4()}`,
  get: ({ get }) => {
    const newToken = get(token);
    console.log('refresh token!!');

    if (newToken) {
      console.log('new token!!');
      try {
        const user = jwt.verify(newToken, process.env.SECRET_KEY);
        return user;
      } catch (error) {
        console.error(error);
        return {};
      }
    } else {
      console.log('no token!!');
      return {};
    }
  },
});

export { beadsData, threadsData, beading, userInfo };
