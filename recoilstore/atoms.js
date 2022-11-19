import { atom } from 'recoil';
import { v4 } from 'uuid';

const deviceSizeAtom = atom({
  key: `deviceSizeAtom/${v4()}`,
  default: 'large',
});

const profileModalAtom = atom({
  key: `profileModalAtom/${v4()}`,
  default: false,
});

const realViewModalAtom = atom({
  key: `realViewModalAtom/${v4()}`,
  default: false,
});

const tokenInfoAtom = atom({
  key: `tokenInfoAtom/${v4()}`,
  default: '',
});

const beadsReceivedAtom = atom({
  key: `beadsReceivedAtom/${v4()}`,
  default: null,
});

const threadsReceivedAtom = atom({
  key: `threadsReceivedAtom/${v4()}`,
  default: null,
});

const exclusiveBeadsAtom = atom({
  key: `exclusiveBeadsAtom/${v4()}`,
  default: [],
});

const beadShapeAtom = atom({
  key: `beadShapeAtom/${v4()}`,
  default: 'circle',
});

const currentBeadAtom = atom({
  key: `currentBeadAtom/${v4()}`,
  default: null,
});

export {
  deviceSizeAtom,
  profileModalAtom,
  realViewModalAtom,
  tokenInfoAtom,
  beadsReceivedAtom,
  threadsReceivedAtom,
  exclusiveBeadsAtom,
  beadShapeAtom,
  currentBeadAtom,
};
