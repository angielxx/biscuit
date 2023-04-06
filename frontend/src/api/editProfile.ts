import { authInstance } from "./axios";
import { requests } from "./requests";

type MyInfoType = {
  nickname: string;
  job: string;
  period: string;
  interests: string[];
}

export const put_myInfo = async (myInfo: MyInfoType) => {
  await authInstance.put(requests.PUT_MYINFO(), myInfo);
};
