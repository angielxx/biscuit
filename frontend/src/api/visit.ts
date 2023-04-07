import { authInstance } from "./axios";
import { requests } from "./requests";

export const get_visit = async (contentId: number) => {
  const response = await authInstance.get(requests.GET_CONTENT(contentId));
  return response.data;
}