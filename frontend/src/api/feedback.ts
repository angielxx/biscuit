import { baseInstance, authInstance } from './axios';
import { requests } from './requests';

export const post_feedback = async (
  contentId: number,
  feedback: number | null,
  timecost: number
) => {
  await baseInstance.post(requests.POST_FEEDBACK(contentId), {
    feedback: feedback,
    timecost: timecost,
  });
};
