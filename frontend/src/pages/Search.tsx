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

const ResultContainer = styled.div`
  ${tw`flex flex-col px-4 gap-10 overflow-scroll pt-4 mt-20`}
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
  isMarked: boolean;
  tags: Array<string>;
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
    setSearchKey(query);
    // 쿼리 스트링 받아서 APi 요청 보내기
    setSearchResult([
      {
        id: 1,
        title: '이은지의 자바스크립트',
        url: 'https://velog.io/@94applekoo/45.-프로미스',
        credit_by: '이은지',
        created_date: '2023-03-22',
        time_cost: 0,
        type: '타입',
        isMarked: false,
        tags: ['Typescript', 'Redux-saga', 'Redux-persist'],
      },
      {
        id: 2,
        title: '이은지의 리액트',
        url: 'https://velog.io/@94applekoo/React-createPortal',
        credit_by: '이은지',
        created_date: '2023-03-21',
        time_cost: 0,
        type: '타입',
        isMarked: false,
        tags: ['Typescript', 'Javascript'],
      },
      {
        id: 3,
        title: '이은지의 CS',
        url: 'https://velog.io/@94applekoo/CS-프로세스와-스레드',
        credit_by: '이은지',
        created_date: '2023-03-21',
        time_cost: 0,
        type: '타입',
        isMarked: false,
        tags: ['Typescript', 'Javascript', 'Redux-saga'],
      },
    ]);
  }, [serchParams]);

  // 무한스크롤 데이터 패칭
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['get_search'],
      enabled: !!searchKey,
      queryFn: ({ pageParam = 0 }) =>
        get_search(searchKey, sort, time, pageParam, size),
      getNextPageParam: (lastPage) =>
        lastPage?.isLast ? undefined : lastPage?.nextLastContentId,
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
      <ResultContainer>
        {searchResult &&
          searchResult.map((content) => (
            <ContentCardItem recentContent={content} />
          ))}
      </ResultContainer>
    </div>
  );
};

export default Search;
