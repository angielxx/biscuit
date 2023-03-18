import tw, { styled, css } from 'twin.macro';
import FilterBtnList from './FilterBtnList';
import FilterTime from './FilterTime';

interface FilterBarProps {
  filterBtnState: boolean[];
  setFilterBtnState: React.Dispatch<React.SetStateAction<boolean[]>>;
  filterTimeState: boolean[];
  setFilterTimeState: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const FilterBarContainer = tw.div`
  w-full h-14 flex justify-between items-center px-4
`;

const FilterBar = ({filterBtnState, setFilterBtnState, filterTimeState, setFilterTimeState}: FilterBarProps) => {
  return (
    <FilterBarContainer>
      <FilterBtnList
        filterBtnState={filterBtnState}
        setFilterBtnState={setFilterBtnState}
      />
      <FilterTime
        filterTimeState={filterTimeState}
        setFilterTimeState={setFilterTimeState}
      />
    </FilterBarContainer>
  )
}

export default FilterBar;