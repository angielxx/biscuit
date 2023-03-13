import { useState } from "react";
import Asidebar from "./Asidebar";
import Searchbar from "./SearchBar";

// css
import styled from "styled-components";

// icons
import biscuit from '../../assets/icons/biscuit.svg';
import search from '../../assets/icons/search.svg';
import theme from '../../assets/icons/theme.svg';
import menu from '../../assets/icons/menu.svg';

const Nav = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  // gap: 157px;

  position: absolute;
  width: 390px;
  height: 73.23px;
  left: 0px;
  top: 0px;

  border-bottom: 1px solid #32373D;
`

const Menus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;

  width: 94.99px;
  height: 24.82px;

  flex: none;
  flex-grow: 0;
`

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  return (
    <>
      <Nav>
        <img src={biscuit} alt="biscuit" />
        <Menus>
          <img src={search} alt="search"
            onClick={() => isSearch ? setIsSearch(false) : setIsSearch(true)}  />
          <img src={theme} alt="theme" />
          <img src={menu} alt="aside-bar"
            onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}  />
        </Menus>
      </Nav>
      {isSearch ? <Searchbar isSearch={isSearch} setIsSearch={setIsSearch} /> : null}
      {isOpen ? <Asidebar isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
    </>
  )
}
