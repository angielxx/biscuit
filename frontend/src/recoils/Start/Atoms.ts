import { atom } from 'recoil';

const isStartModalState = atom({
  key: 'isStartModalState',
  default: false,
})

const isMemberState = atom({
  key: 'isMemberState',
  default: false,
})

const isNameState = atom({
  key: 'isNameState',
  default: "",
})

export { 
  isStartModalState,
  isMemberState,
  isNameState
};