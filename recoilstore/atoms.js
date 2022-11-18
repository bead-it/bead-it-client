import { atom } from 'recoil';
import { v4 } from 'uuid';

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
  default: false,
});

const tokenInfo = atom({
  key: `tokenInfo/${v4()}`,
  default: '',
});

const beadsReceived = atom({
  key: `beadsReceived/${v4()}`,
  default: [],
});

const threadsReceived = atom({
  key: `threadsReceived/${v4()}`,
  default: [],
});

const currentBead = atom({
  key: `currentBead/${v4()}`,
  default: null,
});

export {
  deviceSize,
  profileModal,
  realViewModal,
  tokenInfo,
  beadsReceived,
  threadsReceived,
  currentBead,
};
