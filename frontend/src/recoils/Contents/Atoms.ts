import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const startTimeState = atom({
  key: 'startTimeState',
  default: 0,
});

const endTimeState = atom({
  key: 'endTimeState',
  default: 0,
})

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

const getTimeSelector = selector({
  key: 'getTimeSelector',
  get: ({get}) => {
    return Number(get(endTimeState)) - Number(get(startTimeState));
  }
})

export {
  startTimeState,
  isStartState,
  isModalOpenState,
  recentContentState,
  getTimeSelector,
  endTimeState,
};
