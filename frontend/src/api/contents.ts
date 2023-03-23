import { baseInstance, authInstance } from './axios';
import { requests } from './requests';

interface content {
  id: number;
  title: string;
  url: string;
  credit_by: string;
  created_date: string;
  time_cost: number;
  type: string;
  isMarked: boolean;
  tags: Array<string>;
}

const get_popular_contents = async (): Promise<content[] | undefined> => {
  const response = await baseInstance.get(
    requests.GET_POPULAR_CONTENTS()
  );
  return response.data.results;
}

export { get_popular_contents };