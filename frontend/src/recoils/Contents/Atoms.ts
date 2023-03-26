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

interface content {
  id: number;
  title: string;
  url: string;
  creditBy: string;
  createdDate: string;
  timeCost: number;
  type: string;
  marked: boolean;
  tags: Array<string> | null;
  hit: number;
}
const recentContentState = atom<content>({
  key: 'recentContentState',
  default: {
    id: 0,
    title: '',
    url: '',
    creditBy: '',
    createdDate: '',
    timeCost: 0,
    type: '',
    marked: false,
    tags: [],
    hit: 0,
  },
});

export {
  startTimeState,
  endTimeState,
  isStartState,
  isModalOpenState,
  recentContentState,
};
