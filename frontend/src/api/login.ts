import { baseInstance, authInstance } from "./axios";
import { requests } from "./requests";

export const post_about_user = async (data: {}) => {
  await authInstance.post(requests.POST_ABOUT_USER(), data);
};
