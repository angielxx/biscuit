import { baseInstance, authInstance } from './axios';
import { requests } from './requests';

export const get_quizzes = async (contentId: number) => {
  const { data } = await baseInstance.get(requests.QUIZZES(contentId));
  return data;
};

type BodyType = {
  answers: AnswerType[];
};
type AnswerType = {
  quizId: number;
  answer: boolean;
};

export const post_quizzes = async (contentId: number, body: BodyType) => {
  const { data } = await authInstance.post(requests.QUIZZES(contentId), body);
  return data;
};
