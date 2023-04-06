import { authInstance } from "./axios";
import { requests } from "./requests";

export const post_signout = async () => {
  await authInstance.post(requests.POST_SIGNOUT());
};
