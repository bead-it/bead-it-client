import { selector } from 'recoil';
import { v4 } from 'uuid';
import { beadsReceived, threadsReceived } from './atoms';
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

export { beadsData, threadsData, beading };
