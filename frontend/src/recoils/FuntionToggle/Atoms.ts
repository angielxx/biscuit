import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const functionToggleState = atom({
  key: "functionToggleState",
  default: {
    homePageToggle : false,
    buttonToggle: false,
    dropDownToggle: false,
    filterBarToggle: true,
    bannerToggle: true,
    homeContentsToggle: true,
  },
  effects_UNSTABLE: [persistAtom],
})

export { functionToggleState };