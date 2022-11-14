import { atom } from 'recoil';
import { v4 } from 'uuid';

const profileModal = atom({
  key: `profileModal/${v4}`,
  default: false,
});

const userInfo = atom({
  key: `userInfo/${v4}`,
  default: {},
});

export { profileModal, userInfo };
