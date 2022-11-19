import { selector } from 'recoil';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import {
  beadShapeAtom,
  beadsReceivedAtom,
  exclusiveBeadsAtom,
  threadsReceivedAtom,
  tokenInfoAtom,
} from './atoms';
import makebeadGroupInfo from '../utils/d3datautil/makebeadgroups';
import makeThreadGroup from '../utils/d3datautil/makethreadgroup';
import doBeading from '../utils/d3datautil/beading';

const beadsMapSel = selector({
  key: `beadsMapSel/${v4()}`,
  get: ({ get }) => {
    const beads = get(beadsReceivedAtom);
    const beadsMap = {};

    if (beads) {
      beads.forEach(bead => {
        const { _id: tempId } = bead;
        beadsMap[tempId] = bead;
      });
    }

    return beadsMap;
  },
});

const threadsMapSel = selector({
  key: `threadsMapSel/${v4()}`,
  get: ({ get }) => {
    const threads = get(threadsReceivedAtom);
    const threadsMap = {};

    if (threads) {
      threads.forEach(thread => {
        const { _id: tempId } = thread;
        threadsMap[tempId] = thread;
      });
    }

    return threadsMap;
  },
});

const beadsGroupSel = selector({
  key: `beadGroupSel/${v4()}`,
  get: ({ get }) => {
    const beads = get(beadsReceivedAtom);
    const threads = get(threadsReceivedAtom);
    const beadsMap = get(beadsMapSel);
    const exclusiveBeads = get(exclusiveBeadsAtom);

    if ((beads, threads)) {
      return makebeadGroupInfo(beads, threads, beadsMap, exclusiveBeads);
    }

    return [];
  },
});

const threadsGroupSel = selector({
  key: `threadsGroupSel/${v4()}`,
  get: ({ get }) => {
    const threads = get(threadsReceivedAtom);
    const beadsGroups = get(beadsGroupSel);

    if (beadsGroups.length > 0) {
      return makeThreadGroup(threads, beadsGroups);
    }

    return [];
  },
});

const beadingGroupSel = selector({
  key: `beadingGroupSel/${v4()}`,
  get: ({ get }) => {
    const beadsGroups = get(beadsGroupSel);
    const beadShape = get(beadShapeAtom);

    if (beadsGroups.length > 0) {
      return doBeading(beadsGroups, beadShape);
    }

    return [];
  },
});

const userInfoSel = selector({
  key: `userInfoSel/${v4()}`,
  get: ({ get }) => {
    const newToken = get(tokenInfoAtom);
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

export {
  beadsMapSel,
  threadsMapSel,
  beadsGroupSel,
  threadsGroupSel,
  beadingGroupSel,
  userInfoSel,
};
