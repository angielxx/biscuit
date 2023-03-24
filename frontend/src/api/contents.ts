import { baseInstance, authInstance } from './axios';
import { requests } from './requests';

interface content {
  id: number;
  title: string;
  url: string;
  creditBy: string;
  createdDate: string;
  timeCost: number;
  type: string;
  isMarked: boolean;
  tags: Array<string>;
}

interface randomContent {
  category: string;
  items: content[];
}

const get_home_contents = async (classification: string, categoryCount: number): Promise<content[] | randomContent[] | undefined> => {
  const response = await baseInstance.get(
    requests.GET_HOME_CONTENTS(classification, categoryCount)
  );
  return response.data.results;
}

export { get_home_contents };