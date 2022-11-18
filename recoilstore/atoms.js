import { atom } from 'recoil';
import { v4 } from 'uuid';

import beadMockData from '../spec/beadsmockdata';
import threadsData from '../spec/threadsmockdata';

const deviceSize = atom({
  key: `deviceSize/${v4()}`,
  default: 'large',
});

const profileModal = atom({
  key: `profileModal/${v4()}`,
  default: false,
});

const realViewModal = atom({
  key: `realViewModal/${v4()}`,
  default: true,
});

const token = atom({
  key: `token/${v4()}`,
  default: '',
});

const beadsReceived = atom({
  key: `beads/${v4()}`,
  default: beadMockData,
});

const threadsReceived = atom({
  key: `threads/${v4()}`,
  default: threadsData,
});

export {
  deviceSize,
  profileModal,
  realViewModal,
  token,
  beadsReceived,
  threadsReceived,
};
