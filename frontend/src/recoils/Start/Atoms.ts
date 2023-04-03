import { atom } from 'recoil';

const isStartModalState = atom({
  key: 'isStartModalState',
  default: false,
})

const isLoginState = atom({
  key: 'isLoginState',
  default: false,
})

const isNameState = atom({
  key: 'isNameState',
  default: "",
})

export { 
  isStartModalState,
  isLoginState,
  isNameState
};