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

// 카테고리별 컨텐츠 목록 조회
export const get_category_contents = async (
  categoryName: string,
  size: number,
  pageParams: number
): Promise<
  | {
      results: Array<content>;
      nextPage: number;
      isLast: boolean;
    }
  | undefined
> => {
  try {
    const { data } = await baseInstance.get(
      requests.GET_CATEGORY_CONTENTS(categoryName, size, pageParams)
    );
    console.log('success :', data);
    const { last: isLast } = data.metaData;
    const { results } = data;

    return {
      results,
      nextPage: pageParams + 1,
      isLast,
    };
  } catch (error) {
    console.log('error :', error);
  }
};
