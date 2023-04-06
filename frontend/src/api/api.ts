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
  img: string;
}

// 카테고리별 컨텐츠 목록 조회
export const get_category_contents = async (
  categoryName: string,
  option: string, // "recent", "hit"
  type: string, // "all", "article", "video"
  size: number,
  lastContentId: number,
  from?: number | null,
  to?: number | null
): Promise<
  | {
      contentList: Array<content>;
      nextLastContentId: number;
      isLast: boolean;
    }
  | undefined
> => {
  // console.log(categoryName, option, type, size, lastContentId, from, to);
  const { data } = await baseInstance.get(
    requests.GET_CATEGORY_CONTENTS(
      categoryName,
      option, // "recent", "hit"
      type, // "all", "article", "video"
      size,
      lastContentId,
      from,
      to
    )
  );
  const { last: isLast } = data.metaData;
  const contentList = data.results;
  console.log('data :', data);
  const nextLastContentId = contentList[contentList.length - 1]?.id;
  // console.log('isLast :', isLast);
  return {
    contentList,
    nextLastContentId,
    isLast,
  };
};

// 키워드 검색
export const get_search = async (
  option: string, // "recent", "hit"
  keyword: string,
  condition: string, // "content", "company"
  lastContentId: number,
  size: number,
  from: number,
  to: number,
  type: string // "article", "video"
): Promise<
  | {
      content: Array<content>;
      nextLastContentId: number;
      isLast: boolean;
    }
  | undefined
> => {
  if (!keyword) return;
  const { data } = await baseInstance.get(
    requests.GET_SEARCH(
      option,
      keyword,
      condition,
      lastContentId,
      size,
      from,
      to,
      type
    )
  );
  const { last: isLast } = data.metaData;
  const content = data.results;
  console.log(data);
  const nextLastContentId = content[content.length - 1]?.id;

  return { content, nextLastContentId, isLast };
};
