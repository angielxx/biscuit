export const requests = {
  base_url: 'http://j8a706.p.ssafy.io:8080',

  // 카테고리별 컨텐츠 목록 조회
  GET_CATEGORY_CONTENTS(categoryName: string, size: number, page: number) {
    console.log('here :', categoryName);
    return `/api/contents/${categoryName}`;
    // return `/api/contents/${categoryName}?size=${size}&page=${page}`;
  },

  // 카테고리 목록 조회
  GET_CATEGORIES() {
    return `/api/categories`;
  },

  // 컨텐츠 조회
  GET_CONTENT(contentId: number) {
    return `/api/contents/${contentId}`;
  },

  // 피드백 저장
  POST_FEEDBACK: `/api/feedbacks`,

  // 랜덤 컨텐츠 추천 목록 조회
  GET_RANDOM_CONTENTS(option: string) {
    return `/api/recommends/random/${option}`;
  },

  // 키워드 검색
  GET_SEARCH(keyword: string) {
    return `/api/search?${keyword}`;
  },

  // 퀴즈 제공(GET), 퀴즈 제출 내역 저장(POST)
  QUIZZES(contentId: number) {
    return `/api/${contentId}/quizzes`;
  },
};
