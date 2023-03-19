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
  default: [
    {id: 0, content: "5분 미만", status: false},
    {id: 1, content: "5분 ~ 10분 미만", status: false},
    {id: 2, content: "10분 ~ 20분 미만", status: false},
    {id: 3, content: "20분 ~ 30분 미만", status: false},
    {id: 4, content: "30분 ~ 1시간 미만", status: false},
    {id: 5, content: "1시간 이상", status: false},
  ],
  effects_UNSTABLE: [persistAtom],
})

const filterTimeSelectedState = atom({
  key: "filterTimeSelectedState",
  default: "",
  effects_UNSTABLE: [persistAtom],
})

export { 
  homeFilterBtnState, 
  homeFilterTimeState,
  filterTimeSelectedState,
};