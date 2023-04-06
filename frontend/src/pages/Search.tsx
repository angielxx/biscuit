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
import FilterBar2 from '../components/common/FilterBar/FilterBar2';

const ResultContainer = styled.div`
  ${tw`flex flex-col px-4 gap-10 overflow-scroll pt-4`}
  ${css`
    height: calc(100vh - 148px);
  `}
`;

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

const Search = () => {
  // 검색바에 전달해줄 함수용
  const [isSearch, setIsSearch] = useState<boolean>(false);
  // 검색어
  const [searchKey, setSearchKey] = useState<string>('');
  // 옵션 필터 (최근순, 인기순)
  const [option, setOption] = useState<'recent' | 'hit'>('recent');
  // 타입 (영상, 글)
  const [type, setType] = useState<string>('all');
  // 데이터 사이즈
  const [size, setSize] = useState<number>(20);
  // 검색 결과
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
    // null이 아닐 때만 저장
    if (temp) query = temp;
    setSearchKey(query);

    // 필터바 세팅
    if (!filterBtnState[0] && filterBtnState[1]) setType('article');
    if (filterBtnState[0] && !filterBtnState[1]) setType('video');
  }, [serchParams, filterBtnState]);

  useEffect(() => {
    if (searchKey !== '') {
      fetchNextPage({ pageParam: 999 });
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
      queryKey: ['get_search', searchKey, option, type],
      enabled: searchKey !== '',
      queryFn: ({ pageParam = 999999 }) =>
        get_search(
          option,
          searchKey,
          'content',
          pageParam,
          size,
          0,
          1440,
          type
        ),
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
      <FilterBar2
        filterBtnState={filterBtnState}
        setFilterBtnState={setFilterBtnState}
        setOption={setOption}
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
