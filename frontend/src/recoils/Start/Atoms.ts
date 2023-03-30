import { atom } from 'recoil';

const isStartModalState = atom({
  key: 'isStartModalState',
  default: false,
})

export { isStartModalState };