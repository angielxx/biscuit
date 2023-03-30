import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ContentCardItem from '../components/common/ContentCardItem';
import FilterBar from '../components/common/FilterBar/FilterBar';
import SearchbarAtPage from '../components/common/SearchBarAtPage';
import tw, { styled, css } from 'twin.macro';
import { useInView } from 'react-intersection-observer';

// Recoil
import { homeFilterBtnState, homeFilterTimeState } from '../recoils/Home/Atoms';
import { useInfiniteQuery } from '@tanstack/react-query';
import { get_search } from '../api/api';
import Loading from '../components/common/Loading';

const ResultContainer = styled.div`
  ${tw`flex flex-col px-4 gap-10 overflow-scroll pt-4`}
  ${css`
    height: calc(100vh - 148px);
  `}
`;

interface content {
  id: number;
  title: string;
  url: string;
  creditBy: string;
  createdDate: string;
  timeCost: number;
  type: string;
  marked: boolean;
  tags: Array<string> | null;
  hit: number;
}

const Search = () => {
  // 검색바에 전달해줄 함수용
  const [isSearch, setIsSearch] = useState<boolean>(false);
  // 검색어
  const [searchKey, setSearchKey] = useState<string>('');
  // 정렬 필터
  const [sort, setSort] = useState<string | null>(null);
  // 시간 필터
  const [time, setTime] = useState<number | null>(null);
  // 데이터 사이즈
  const [size, setSize] = useState<number>(20);
  // 검색 결과
  const [searchResult, setSearchResult] = useState<Array<content> | null>();
  const [serchParams, setSearchParams] = useSearchParams();
  // 필터바 정보 RecoilState
  const [filterBtnState, setFilterBtnState] =
    useRecoilState(homeFilterBtnState);
  const [filterTimeState, setFilterTimeState] =
    useRecoilState(homeFilterTimeState);

  // 스크롤 옵져버
  const { ref, inView } = useInView();

  // 검색어 쿼리 url에서 가져오기
  let query: string;
  useEffect(() => {
    // 임시로 저장
    const temp = serchParams.get('q');
    // null이 아닐 떄만 저장
    if (temp) query = temp;
    console.log(temp);
    setSearchKey(query);
  }, [serchParams]);

  useEffect(() => {
    if (searchKey !== '') {
      fetchNextPage({ pageParam: 0 });
    }
  }, [searchKey]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // 무한스크롤 데이터 패칭
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['get_search', searchKey],
      enabled: !!searchKey,
      queryFn: ({ pageParam = 999 }) =>
        get_search(searchKey, sort, time, pageParam, size),
      getNextPageParam: (lastPage) => {
        return lastPage?.isLast ? undefined : lastPage?.nextLastContentId;
      },
    });

  return (
    <div>
      <SearchbarAtPage
        isSearch={true}
        searchKey={searchKey}
        setIsSearch={setIsSearch}
      />
      <FilterBar
        filterBtnState={filterBtnState}
        setFilterBtnState={setFilterBtnState}
        filterTimeState={filterTimeState}
        setFilterTimeState={setFilterTimeState}
      />
      <ResultContainer id="result-container">
        {data?.pages.map((page, index: number) => (
          <React.Fragment key={index}>
            {page?.content?.map((content) => (
              <ContentCardItem key={content.id} content={content} />
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage ? <Loading /> : <div ref={ref} id="observer"></div>}
      </ResultContainer>
    </div>
  );
};

export default Search;
