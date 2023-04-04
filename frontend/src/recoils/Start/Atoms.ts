import { atom } from 'recoil';

const isStartModalState = atom({
  key: 'isStartModalState',
  default: false,
})

const isNoobState = atom({
  key: 'isNoobState',
  default: true,
})

const isNameState = atom({
  key: 'isNameState',
  default: "",
})

export { 
  isStartModalState,
  isNoobState,
  isNameState
};