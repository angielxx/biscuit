import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const startTimeState = atom({
  key: 'startTimeState',
  default: Date.now(),
});

const endTimeState = atom({
  key: 'endTimeState',
  default: Date.now(),
});

const isStartState = atom({
  key: 'isStartState',
  default: false,
});

const isModalOpenState = atom({
  key: 'isModalOpenState',
  default: false,
});

const recentContentState = atom({
  key: 'recentContentState',
  default: {},
});

export {
  startTimeState,
  endTimeState,
  isStartState,
  isModalOpenState,
  recentContentState,
};
