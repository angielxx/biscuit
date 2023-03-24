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

// 카테고리별 컨텐츠 목록 조회
export const get_category_contents = async (
  categoryName: string,
  sort: string | null,
  time: number | null,
  lastContentId: number,
  size: number
): Promise<
  | {
      contentList: Array<content>;
      nextLastContentId: number;
      isLast: boolean;
    }
  | undefined
> => {
  const { data } = await baseInstance.get(
    requests.GET_CATEGORY_CONTENTS(
      categoryName,
      sort,
      time,
      lastContentId,
      size
    )
  );
  const { last: isLast } = data.metaData;
  const contentList = data.results;
  console.log('contentList :', contentList);
  const nextLastContentId = contentList[contentList.length - 1]?.id;

  return {
    contentList,
    nextLastContentId,
    isLast,
  };
};

// 키워드 검색
export const get_search = async (
  keyword: string,
  sort: string | null,
  time: number | null,
  lastContentId: number,
  size: number
): Promise<
  | {
      contentList: Array<content>;
      nextLastContentId: number;
      isLast: boolean;
    }
  | undefined
> => {
  const { data } = await baseInstance.get(
    requests.GET_SEARCH(keyword, sort, time, lastContentId, size)
  );
  const { last: isLast } = data.metaData;
  const { contentList } = data.results;
  const nextLastContentId = contentList[contentList.length - 1]?.id;

  return { contentList, nextLastContentId, isLast };
};
