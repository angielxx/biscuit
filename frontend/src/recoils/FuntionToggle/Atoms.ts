import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const functionToggleState = atom({
  key: "functionToggleState",
  default: {
    homePageToggle : true,
    buttonToggle: true,
    dropDownToggle: true,
    filterBarToggle: true,
    bannerToggle: true,
    homeContentsToggle: true,
  },
  effects_UNSTABLE: [persistAtom],
})

export { functionToggleState };