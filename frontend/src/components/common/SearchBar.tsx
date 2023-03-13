import { useState, FormEvent, KeyboardEvent } from 'react';

// css
import styled from "styled-components";

// icons
import searchBar from '../../assets/icons/search-bar.svg';
import close from '../../assets/icons/close.svg';

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

export default function Searchbar({ isSearch, setIsSearch }: { isSearch: boolean; setIsSearch: any }) {
  const [value, setValue] = useState<string>("");

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setValue(value);
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log(value);
    }
  }

  return (
    <SearchBar>
      <img src={searchBar} alt='search' />
      <form>
        <input 
          type="text"
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
      </form>
      <img src={close} alt='close' onClick={() => isSearch ? setIsSearch(false) : setIsSearch(true)} />
    </SearchBar>
  )
}
