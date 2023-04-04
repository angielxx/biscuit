import { atom } from 'recoil';

const isStartModalState = atom({
  key: 'isStartModalState',
  default: false,
})

const isNoobState = atom({
  key: 'isNoobState',
  default: false,
})

export { 
  isStartModalState,
  isNoobState,
};