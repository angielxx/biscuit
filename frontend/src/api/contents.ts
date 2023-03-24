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

const get_home_contents = async (classification: string, categoryCount: number): Promise<content[] | undefined> => {
  const response = await baseInstance.get(
    requests.GET_HOME_CONTENTS(classification, categoryCount)
  );
  return response.data.results;
}

export { get_home_contents };