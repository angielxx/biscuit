import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const functionToggleState = atom({
  key: "functionToggleState",
  default: {
    homePageToggle : false,
  },
  effects_UNSTABLE: [persistAtom],
})

export { functionToggleState };