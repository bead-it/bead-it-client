import { atom } from 'recoil';
import { v4 } from 'uuid';

const profileModal = atom({
  key: `profileModal/${v4()}`,
  default: false,
});

const realViewModal = atom({
  key: `realViewModal/${v4()}`,
  default: true,
});

const userInfo = atom({
  key: `userInfo/${v4()}`,
  default: {},
});

export { profileModal, realViewModal, userInfo };
