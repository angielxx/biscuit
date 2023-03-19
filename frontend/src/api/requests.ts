const requests = {
  category: {
    /** 피드 내용 GET 요청 */
    // 페이지네이션 물어보기
    getCategory(category: any) {
      return `/contents/${category}`;
    },
  },
}

export default requests;