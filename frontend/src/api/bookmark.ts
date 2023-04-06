import { baseInstance, authInstance } from './axios';
import { requests } from './requests';

export const get_bookmark = async () => {
  const data = {};
  return data;
};

export const post_bookmark = async (contentId: number) => {
  const { data } = await authInstance.post(requests.POST_BOOKMARK(), {
    contentId: contentId,
  });
  console.log('post bookmark :', data);
};

export const delete_bookmark = async (contentId: number) => {
  const { data } = await authInstance.delete(
    requests.DELETE_BOOKMARK(contentId)
  );
  console.log('delete bookmark :', data);
};
