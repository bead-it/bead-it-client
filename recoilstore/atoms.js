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

const detailModalAtom = atom({
  key: `detailModalAtom/${v4()}`,
  default: false,
});

const detailModalContentsAtom = atom({
  key: `detailModalContentsAtom/${v4()}`,
  default: {},
});

const mouseoverBeadPositionAtom = atom({
  key: `mouseoverBeadPositionAtom/${v4()}`,
  default: {},
});

const beadActionModalAtom = atom({
  key: `beadActionModalAtom/${v4()}`,
  default: false,
});

const inputModalAtom = atom({
  key: `inputModalAtom/${v4()}`,
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

const currentBeadIdAtom = atom({
  key: `currentBeadIdAtom/${v4()}`,
  default: '',
});

const currentBeadworkInfoAtom = atom({
  key: `currentBeadworkInfoAtom/${v4()}`,
  default: null,
});

const addBeadButtonAtom = atom({
  key: `addBeadButtonAtom/${v4()}`,
  default: false,
});

export {
  deviceSizeAtom,
  profileModalAtom,
  realViewModalAtom,
  detailModalAtom,
  detailModalContentsAtom,
  mouseoverBeadPositionAtom,
  beadActionModalAtom,
  inputModalAtom,
  tokenInfoAtom,
  beadsReceivedAtom,
  threadsReceivedAtom,
  exclusiveBeadsAtom,
  beadShapeAtom,
  currentBeadIdAtom,
  currentBeadworkInfoAtom,
  addBeadButtonAtom,
};
