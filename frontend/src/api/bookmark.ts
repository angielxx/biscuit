import { baseInstance, authInstance } from './axios';
import { requests } from './requests';

interface Bookmark {
  bookmarkId: number;
  contentId: number;
  createdDate: string;
  creditBy: string;
  hit: number;
  marked: boolean;
  source: string;
  tags: string[];
  timeCost: number;
  title: string;
  type: string;
}

export const get_bookmark = async (
  lastContentId: number,
  size: number
): Promise<{
  bookmarkList: Bookmark[];
  nextLastContentId: number;
  isLast: boolean;
}> => {
  const { data } = await authInstance.get(
    requests.GET_BOOKMARK(lastContentId, size)
  );
  const bookmarkList = data.results;
  const nextLastContentId = data.metaData.lastContentId;
  const isLast = data.metaData.last;
  console.log({
    bookmarkList,
    nextLastContentId,
    isLast,
  });
  return {
    bookmarkList,
    nextLastContentId,
    isLast,
  };
};

export const post_bookmark = async (contentId: number) => {
  await authInstance.post(requests.POST_BOOKMARK(), {
    contentId: contentId,
  });
};

export const delete_bookmark = async (contentId: number) => {
  await authInstance.delete(requests.DELETE_BOOKMARK(contentId));
};
