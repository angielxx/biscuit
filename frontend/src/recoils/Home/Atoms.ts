import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const homeFilterBtnState = atom({
  key: "homeFilterBtnState",
  default: [false, false],
  effects_UNSTABLE: [persistAtom],
})

const homeFilterTimeState = atom({
  key: "homeFilterTimeState",
  default: [false, false, false, false, false, false],
  effects_UNSTABLE: [persistAtom],
})

export { homeFilterBtnState, homeFilterTimeState };