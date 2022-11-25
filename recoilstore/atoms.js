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

const webViewModalAtom = atom({
  key: `webViewModalAtom/${v4()}`,
  default: false,
});

const detailModalAtom = atom({
  key: `detailModalAtom/${v4()}`,
  default: false,
});

const mouseoverBeadPositionAtom = atom({
  key: `mouseoverBeadPositionAtom/${v4()}`,
  default: {},
});

const beadActionModalAtom = atom({
  key: `beadActionModalAtom/${v4()}`,
  default: false,
});

const beadCreationModalAtom = atom({
  key: `beadCreationModalAtom/${v4()}`,
  default: false,
});

const threadModifyModalAtom = atom({
  key: `threadModifyModalAtom/${v4()}`,
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

const currentThreadIdAtom = atom({
  key: `currentThreadIdAtom/${v4()}`,
  default: '',
});

const mouseoverBeadIdAtom = atom({
  key: `mouseoverBeadIdAtom/${v4()}`,
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

const selectStartPointAtom = atom({
  key: `selectStartPointAtom/${v4()}`,
  default: false,
});

const selectedBeadsAtom = atom({
  key: `selectedBeadsAtom/${v4()}`,
  default: [],
});

const currentSrcAtom = atom({
  key: `currentSrcAtom/${v4()}`,
  default: '',
});

const srcHistoryAtom = atom({
  key: `srcHistoryAtom/${v4()}`,
  default: {
    pos: -1,
    stack: [],
  },
});

export {
  deviceSizeAtom,
  profileModalAtom,
  webViewModalAtom,
  detailModalAtom,
  mouseoverBeadPositionAtom,
  beadActionModalAtom,
  beadCreationModalAtom,
  threadModifyModalAtom,
  inputModalAtom,
  tokenInfoAtom,
  beadsReceivedAtom,
  threadsReceivedAtom,
  exclusiveBeadsAtom,
  beadShapeAtom,
  currentBeadIdAtom,
  currentThreadIdAtom,
  mouseoverBeadIdAtom,
  currentBeadworkInfoAtom,
  addBeadButtonAtom,
  selectStartPointAtom,
  selectedBeadsAtom,
  currentSrcAtom,
  srcHistoryAtom,
};
