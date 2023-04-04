import tw, { styled, css } from 'twin.macro';
import FilterBtnList from './FilterBtnList';
import FilterTime from './FilterTime';
import FilterSort from './FilterSort';
import { useState } from 'react';

type ItemObj = {
  id: number;
  content: string;
  status: boolean;
};

interface FilterBarProps {
  filterBtnState: boolean[];
  setFilterBtnState: React.Dispatch<React.SetStateAction<boolean[]>>;
  setOption: React.Dispatch<React.SetStateAction<'recent' | 'hit'>>;
}

const FilterBarContainer = tw.div`
  w-full h-17 flex justify-between items-start px-4 bg-black
`;

type sort = {
  id: number;
  content: string;
  status: boolean;
};

const FilterBar2 = ({
  filterBtnState,
  setFilterBtnState,
  setOption,
}: FilterBarProps) => {
  const [filterSortState, setFilterSortState] = useState<sort[]>([
    { id: 0, content: '최신순', status: false },
    { id: 1, content: '인기순', status: false },
  ]);

  return (
    <FilterBarContainer>
      <FilterBtnList
        filterBtnState={filterBtnState}
        setFilterBtnState={setFilterBtnState}
      />
      <FilterSort
        filterSortState={filterSortState}
        setFilterSortState={setFilterSortState}
        setOption={setOption}
      />
    </FilterBarContainer>
  );
};

export default FilterBar2;
