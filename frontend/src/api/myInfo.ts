import { authInstance } from "./axios";
import { requests } from "./requests";

interface MyInfoContent {
  nickname: string,
  job: string,
	period: number,
  interests: string[],
}

export const get_myInfo = async (): Promise<MyInfoContent> => {
  const response = await authInstance.get(requests.GET_MYINFO());
  return response.data;
}