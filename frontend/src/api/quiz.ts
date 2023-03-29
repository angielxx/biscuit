import { baseInstance, authInstance } from './axios';
import { requests } from './requests';

export const get_quizzes = async (contentId: number) => {
  const { data } = await baseInstance.get(requests.QUIZZES(contentId));
  return data;
};

export const post_quizzes = async (contentId: number) => {
  await baseInstance.post(requests.QUIZZES(contentId));
};
