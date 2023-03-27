import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useOnClickOutside from '../../hooks/useOnClickOutside';

// components
import Asidebar from './Asidebar';
import Searchbar from './SearchBar';

// css
import tw, { styled } from 'twin.macro';

// icons
import biscuit from '../../assets/icons/biscuit.svg';
import search from '../../assets/icons/search.svg';
import theme from '../../assets/icons/theme.svg';
import menu from '../../assets/icons/menu.svg';

const Nav = styled.div`
  ${tw`fixed z-20 box-border flex justify-between items-center px-3 py-4 w-full h-20 left-0 top-0 border-b border-solid border-dark-grey20 bg-black`}
`;

const Menus = styled.div`
  ${tw`flex items-start p-0 gap-3 w-fit h-fit`}
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  const goHome = () => {
    navigate('/');
    setIsSearch(false);
  };

  // 검색 페이지에서는 NavBar를 통한 검색바 보이지 않게 설정
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/search') {
      setIsSearch(false);
    }
  }, [location]);

  return (
    <div ref={ref}>
      <Nav>
        <img src={biscuit} alt="biscuit" onClick={goHome} />
        <Menus>
          <img
            src={search}
            alt="search"
            onClick={() => {
              // 검색 페이지일 때 검색 아이콘 클릭 비활성화
              if (location.pathname === '/search') return;
              isSearch ? setIsSearch(false) : setIsSearch(true);
            }}
          />
          <img src={theme} alt="theme" />
          <img
            src={menu}
            alt="aside-bar"
            onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
          />
        </Menus>
      </Nav>
      {isSearch 
        ? <Searchbar isSearch={isSearch} setIsSearch={setIsSearch} searchKey="" />
        : null}
      {isOpen 
        ? <Asidebar isOpen={isOpen} setIsOpen={setIsOpen} /> 
        : null}
    </div>
  );
};

export default Navbar;
