import { useState, FormEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// css
import tw, { styled } from 'twin.macro';

// icons
import searchBar from '../../assets/icons/search-bar.svg';
import close from '../../assets/icons/close.svg';

const SearchBar = styled.div`
  ${tw`flex items-center p-4 gap-4 top-18`}
`

const Input = styled.input`
  ${tw`box-border w-full h-9 bg-transparent border-b border-solid border-dark-grey50 text-dark-grey50`}

  &:focus {
    ${tw`outline-none text-dark-primary border-b border-solid border-dark-primary`}
  }
`

interface SearchProps {
  isSearch: boolean;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Searchbar = ({ isSearch, setIsSearch }: SearchProps) => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

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

      // /search?q=리액트 같은 쿼리스트링 주소로 이동
      const URLSearch = new URLSearchParams(location.search);
      URLSearch.set('q', search);
      const newParam = URLSearch.toString();
      navigate('/search?' + newParam);
    }
  }

  return (
    <SearchBar>
      <img src={searchBar} alt='search' />
      <form className='w-full'>
        <Input 
          type="text"
          value={search}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
      </form>
      <img src={close} alt='close' onClick={() => isSearch ? setIsSearch(false) : setIsSearch(true)} />
    </SearchBar>
  )
}

export default Searchbar;
