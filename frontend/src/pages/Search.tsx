import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContentCardItem from '../components/common/ContentCardItem';
import Searchbar from '../components/common/SearchBar';

interface result {
  id: number;
  title: string;
  url: string;
  writer: string;
  credit_by: string;
  created_date: string;
  time_cost: number;
  type: string;
  isMarked: boolean;
  tags: Array<string>;
}

const Search = () => {
  // 검색어
  const [searchKey, setSearchKey] = useState<null | string>(null);
  // 검색 결과
  const [searchResult, setSearchResult] = useState<Array<result>>([
    {
      id: 0,
      title: '',
      url: '',
      writer: '',
      credit_by: '',
      created_date: '',
      time_cost: 0,
      type: '',
      isMarked: false,
      tags: [],
    },
  ]);
  const [serchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = serchParams.get('q');
    console.log(query);
    setSearchKey(query);
    // 쿼리 스트링 받아서 APi 요청 보내기
  });

  return (
    <div>
      <Searchbar isSearch={true} searchKey={searchKey} />
      <div>
        {searchResult &&
          searchResult.map((content) => (
            <ContentCardItem recentContent={content} />
          ))}
      </div>
    </div>
  );
};

export default Search;
