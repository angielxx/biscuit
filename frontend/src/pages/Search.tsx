import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ContentCardItem from '../components/common/ContentCardItem';
import FilterBar from '../components/common/FilterBar/FilterBar';
import Searchbar from '../components/common/SearchBar';
import SearchbarAtPage from '../components/common/SearchBarAtPage';
import tw, { styled, css } from 'twin.macro';

// Recoil
import { homeFilterBtnState, homeFilterTimeState } from '../recoils/Home/Atoms';

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
  //
  const [isSearch, setIsSearch] = useState<boolean>(false);
  // 검색어
  const [searchKey, setSearchKey] = useState<string | null>('');
  // 검색 결과
  const [searchResult, setSearchResult] = useState<Array<content> | null>();
  const [serchParams, setSearchParams] = useSearchParams();
  // 필터바 정보 RecoilState
  const [filterBtnState, setFilterBtnState] =
    useRecoilState(homeFilterBtnState);
  const [filterTimeState, setFilterTimeState] =
    useRecoilState(homeFilterTimeState);

  let query: string | null;
  useEffect(() => {
    query = serchParams.get('q');
    setSearchKey(query);
    // 쿼리 스트링 받아서 APi 요청 보내기
    setSearchResult([
      {
        id: 1,
        title: '이은지의 자바스크립트',
        url: 'https://velog.io/@94applekoo/45.-프로미스',
        creditBy: '이은지',
        createdDate: '2023-03-22',
        timeCost: 0,
        type: '타입',
        isMarked: false,
        tags: ['Typescript', 'Redux-saga', 'Redux-persist'],
      },
      {
        id: 2,
        title: '이은지의 리액트',
        url: 'https://velog.io/@94applekoo/React-createPortal',
        creditBy: '이은지',
        createdDate: '2023-03-21',
        timeCost: 0,
        type: '타입',
        isMarked: false,
        tags: ['Typescript', 'Javascript'],
      },
      {
        id: 3,
        title: '이은지의 CS',
        url: 'https://velog.io/@94applekoo/CS-프로세스와-스레드',
        creditBy: '이은지',
        createdDate: '2023-03-21',
        timeCost: 0,
        type: '타입',
        isMarked: false,
        tags: ['Typescript', 'Javascript', 'Redux-saga'],
      },
    ]);
  }, [serchParams]);

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
