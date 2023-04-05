import { authInstance } from "./axios";
import { requests } from "./requests";

interface MyInfoContent {
  nickname: string,
  job: string,
	period: string,
  interest: string[],
}

export const get_myInfo = async (): Promise<MyInfoContent> => {
  return await authInstance.get(requests.GET_MYINFO());
}