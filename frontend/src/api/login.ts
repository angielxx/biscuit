import { baseInstance, authInstance } from "./axios";
import { requests } from "./requests";

export const post_authorizationCode = async (authorizationCode: string) => {
  await baseInstance.post(requests.GOOGLE_LOGIN(authorizationCode));
}
