import { selector } from 'recoil';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import {
  beadShapeAtom,
  beadsReceivedAtom,
  exclusiveBeadsAtom,
  mouseoverElementIdAtom,
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
    if (process.env.NODE_ENV === 'development') {
      console.log('refresh token!!');
    }

    if (newToken) {
      if (process.env.NODE_ENV === 'development') {
        console.log('new token!!');
      }
      try {
        const user = jwt.verify(
          newToken,
          `-----BEGIN PUBLIC KEY-----\n${process.env.NEXT_PUBLIC_PUBLIC_KEY}\n-----END PUBLIC KEY-----`,
        );
        return user;
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }
        window.alert(
          'Your authentication has expired!! Please sign in first!!',
        );
        return {};
      }
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('no token!!');
      }
      return {};
    }
  },
});

const detailModalContentsSel = selector({
  key: `detailModalContentsSel/${v4()}`,
  get: ({ get }) => {
    const beadsMap = get(beadsMapSel);
    const threadsMap = get(threadsMapSel);

    const elementId = get(mouseoverElementIdAtom);

    if (!elementId) {
      return {};
    }

    if (beadsMap[elementId]) {
      return {
        url: beadsMap[elementId]?.page.url,
        title: beadsMap[elementId]?.page.title,
        domain: beadsMap[elementId]?.page.domain,
      };
    }

    if (threadsMap[elementId]) {
      return {
        content: threadsMap[elementId].content,
      };
    }

    return {};
  },
});

export {
  beadsMapSel,
  threadsMapSel,
  beadsGroupSel,
  threadsGroupSel,
  beadingGroupSel,
  userInfoSel,
  detailModalContentsSel,
};
