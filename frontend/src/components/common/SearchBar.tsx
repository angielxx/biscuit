import React, { useState, FormEvent, KeyboardEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';

// css
import tw, { css, styled } from 'twin.macro';

// icons
import searchBar from '../../assets/icons/search-bar.svg';
import close from '../../assets/icons/close.svg';

const SearchBar = styled.div`
  ${tw`flex items-center p-4 gap-4 top-20 absolute bg-black w-full z-10`}
`;

const Input = styled.input`
  ${tw`box-border w-full h-9 bg-transparent border-b border-solid border-grey50 text-grey50`}

  &:focus {
    ${tw`outline-none text-primary border-b border-solid border-primary`}
  }
`;

const BackdropWrapper = styled.div`
  ${css`
    background: rgba(0, 0, 0, 0.75);
  `}
  ${tw`fixed top-0 left-0 w-full h-full z-10`}
`;

interface BackdropProps {
  onClose?: () => void;
}

function Backdrop({ onClose }: BackdropProps) {
  return <BackdropWrapper onClick={onClose} />;
}

interface SearchProps {
  isSearch: boolean;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  searchKey: string | null;
}

const Searchbar = ({ isSearch, setIsSearch, searchKey }: SearchProps) => {
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchKey) setSearch(searchKey);
  }, [searchKey]);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setSearch(value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // console.log(search);

      // /search?q=리액트 같은 쿼리스트링 주소로 이동
      const URLSearch = new URLSearchParams(location.search);
      URLSearch.set('q', search);
      const newParam = URLSearch.toString();
      navigate('/search?' + newParam);
    }
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={() => setIsSearch(false)} />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <SearchBar>
          <img src={searchBar} alt="search" />
          <form className="w-full">
            <Input
              type="text"
              value={search}
              onChange={onChange}
              onKeyPress={handleKeyPress}
            />
          </form>
          <img
            src={close}
            alt="close"
            onClick={() => (isSearch ? setIsSearch(false) : setIsSearch(true))}
          />
        </SearchBar>,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </React.Fragment>
  );
};

export default Searchbar;
