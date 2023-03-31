export const requests = {
  base_url: 'http://j8a706.p.ssafy.io:8080',

  // 카테고리별 컨텐츠 목록 조회
  GET_CATEGORY_CONTENTS(
    categoryName: string,
    sort: string | null = null,
    time: number | null = null,
    lastContentId: number = 0,
    size: number
  ) {
    // return `/api/contents/${categoryName}?size=${size}&lastContentId=${lastContentId}&sort=${sort}&time=${time}`;
    return (
      `/api/categories/${categoryName}/contents/recent?size=${size}&lastContentId=${lastContentId}` +
      `${sort ? `&sort=${sort}` : ''}` +
      `${time ? `&time=${time}` : ''}`
    );
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
  POST_FEEDBACK(contentId: number) {
    return `/api/contents/${contentId}/feedback`;
  },

  // 키워드 검색
  GET_SEARCH(
    keyword: string,
    sort: string | null,
    time: number | null,
    lastContentId: number,
    size: number
  ) {
    // return `/api/search?keyword=${keyword}&sort=${sort}&time=${time}&lastContentId=${lastContentId}&size=${size}`;
    return (
      `/api/search?keyword=${keyword}&lastContentId=${lastContentId}&size=${size}` +
      `${sort ? `&sort=${sort}` : ''}` +
      `${time ? `&time=${time}` : ''}`
    );
  },

  // 퀴즈 제공(GET), 퀴즈 제출 내역 저장(POST)
  QUIZZES(contentId: number) {
    return `/api/${contentId}/quizzes`;
  },

  // 홈 인기/최신/랜덤 컨텐츠 추천 목록 조회
  GET_HOME_CONTENTS(classification: string, categoryCount?: number, fromTo?: {start: number; end: number;}) {
    let route = "/api/recommends/random";
    route += classification === "category" ? `/${classification}?categoryCount=${categoryCount}` : `?sort=${classification}`;
    route += `&type=all&from=${fromTo?.start}&to=${fromTo?.end}`;
    return route;
  },

  // 구글 로그인 인가코드 전달
  GOOGLE_LOGIN(authorizationCode: string) {
    return `/api/auth/signin/google`;
  },

  // 가입 설문조사 전달
  POST_ABOUT_USER() {
    return `/api/members/research`;
  }
};
