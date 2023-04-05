import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const startTimeState = atom({
  key: 'startTimeState',
  default: 0,
});

const endTimeState = atom({
  key: 'endTimeState',
  default: 0,
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
  source: string; // 영상: video_id, 글: url
  creditBy: string;
  createdDate: string;
  timeCost: number;
  type: string;
  marked: boolean;
  tags: Array<string> | null;
  hit: number;
  img: string;
}
const recentContentState = atom<content>({
  key: 'recentContentState',
  default: {
    id: 0,
    title: '',
    source: '',
    creditBy: '',
    createdDate: '',
    timeCost: 0,
    type: '',
    marked: false,
    tags: [],
    hit: 0,
    img: '',
  },
});

const getTimeSelector = selector({
  key: 'getTimeSelector',
  get: ({ get }) => {
    return Number(get(endTimeState)) - Number(get(startTimeState));
  },
});

export {
  startTimeState,
  isStartState,
  isModalOpenState,
  recentContentState,
  getTimeSelector,
  endTimeState,
};
