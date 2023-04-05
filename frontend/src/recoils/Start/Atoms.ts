import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const isStartModalState = atom({
  key: 'isStartModalState',
  default: false,
})

const isNoobState = atom({
  key: 'isNoobState',
  default: true,
  effects_UNSTABLE: [persistAtom],
})

const isNameState = atom({
  key: 'isNameState',
  default: "",
  effects_UNSTABLE: [persistAtom],
})

export { 
  isStartModalState,
  isNoobState,
  isNameState
};