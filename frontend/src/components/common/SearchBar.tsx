import { useState, FormEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// css
import tw, { styled } from 'twin.macro';

// icons
import searchBar from '../../assets/icons/search-bar.svg';
import close from '../../assets/icons/close.svg';

const SearchBar = styled.div`
  ${tw`flex items-center p-4 gap-4 absolute left-0 top-[73px]`}
`

const Input = styled.input`
  ${tw`box-border w-[278px] h-[35px] bg-transparent border-b border-solid border-dark-grey50`}

  &:focus {
    ${tw`outline-none text-primary border-b border-solid border-dark-primary`}
  }
`

interface SearchProps {
  isSearch: boolean;
  setIsSearch: any;
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

      const URLSearch = new URLSearchParams(location.search);
      URLSearch.set('q', String(search));
      const newParam = URLSearch.toString();
      navigate('/search?' + newParam);
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

export default Searchbar;
