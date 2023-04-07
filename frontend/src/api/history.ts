import { baseInstance, authInstance } from './axios';
import { requests } from './requests';

interface History {
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
  img: string;
}

export const get_history = async (
  lastContentId: number,
  size: number
): Promise<{
  historyList: History[];
  nextLastContentId: number;
  isLast: boolean;
}> => {
  const { data } = await authInstance.get(
    requests.GET_HISTORY(lastContentId, size)
  );
  const historyList = data.results;
  const nextLastContentId = data.metaData.lastContentId;
  const isLast = data.metaData.last;

  return {
    historyList,
    nextLastContentId,
    isLast,
  };
};
