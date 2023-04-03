import { atom } from 'recoil';

const isStartModalState = atom({
  key: 'isStartModalState',
  default: false,
})

const isLoginState = atom({
  key: 'isLoginState',
  default: false,
})

const isUserState = atom({
  key: 'isUserState',
  default: false,
})

export { 
  isStartModalState,
  isLoginState,
  isUserState
};