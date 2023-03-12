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

const Bar = styled.div`
  box-sizing: border-box;

  width: 278px;
  height: 35px;

  border-bottom: 1px solid #ECECEC;

  flex: none;
  // order: 0;
  flex-grow: 1;
`

export default function Searchbar({ isSearch, setIsSearch }: { isSearch: boolean; setIsSearch: any }) {

  return (
    <SearchBar>
      <img src={searchBar} alt='search' />
      <Bar></Bar>
      <img src={close} alt='close' />
    </SearchBar>
  )
}
