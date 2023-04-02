import { baseInstance, authInstance } from './axios';
import { requests } from './requests';

interface content {
  id: number;
  title: string;
  source: string; // 영상: video_id, 글: url
  creditBy: string;
  createdDate: string;
  timeCost: number;
  type: string;
  marked: boolean;
  tags: Array<string> | null;
  hit: number;
}

interface randomContent {
  category: string;
  items: content[];
}

const get_home_contents = async (
  classification: string,
  categoryCount?: number,
  fromTo?: {
    start: number;
    end: number;
  }
): Promise<content[] | randomContent[] | undefined> => {
  const response = await baseInstance.get(
    requests.GET_HOME_CONTENTS(classification, categoryCount, fromTo)
  );
  return response.data.results;
};

export { get_home_contents };
