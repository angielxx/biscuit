import { useState, FormEvent, KeyboardEvent } from 'react';

// css
import styled from "styled-components";

// icons
import searchBar from '../../assets/icons/search-bar.svg';
import close from '../../assets/icons/close.svg';
import axios from 'axios';

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;

  position: absolute;
  left: 0px;
  top: 73px;

  background: #1A1B1E;
`

const Input = styled.input`
  box-sizing: border-box;
  background: transparent;

  width: 278px;
  height: 35px;

  border-bottom: 1px solid #7F878F;

  flex: none;
  order: 1;
  flex-grow: 1;

  &:focus {
    outline: none;
    border-bottom: 1px solid #3FE5EF;
    color: #3FE5EF;
  }
`

export default function Searchbar({ isSearch, setIsSearch }: { isSearch: boolean; setIsSearch: any }) {
  const [search, setSearch] = useState<string>("");
  const [searchlist, setSearchList] = useState([]);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setSearch(value);
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log(search);

      // 검색 키워드 백으로 보내서 받아오는 로직
      // axios
      //   .post(`/api/search?${search}`)
      //   .then((res) => {
      //     console.log(res);
      //     // search_list = 각 검색 결과가 담긴 리스트
      //     const search_list = res.data.results;
      //     setSearchList(search_list);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
    }
  }

  return (
    <>
      <SearchBar>
        <img src={searchBar} alt='search' />
        <form>
          <Input 
            type="text"
            value={search}
            onChange={onChange}
            onKeyPress={handleKeyPress}
          />
        </form>
        <img src={close} alt='close' onClick={() => isSearch ? setIsSearch(false) : setIsSearch(true)} />
      </SearchBar>
    </>
  )
}
