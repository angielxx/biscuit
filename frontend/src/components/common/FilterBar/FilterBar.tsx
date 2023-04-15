import tw, { styled, css } from 'twin.macro';
import FilterBtnList from './FilterBtnList';
import FilterTime from './FilterTime';

type ItemObj = {
  id: number;
  content: string;
  status: boolean;
};

interface FilterBarProps {
  filterBtnState: boolean[];
  setFilterBtnState: React.Dispatch<React.SetStateAction<boolean[]>>;
  filterTimeState: ItemObj[];
  setFilterTimeState: React.Dispatch<React.SetStateAction<ItemObj[]>>;
}

const FilterBarContainer = tw.div`
  w-full h-17 flex justify-between items-start px-4
`;

const FilterBar = ({
  filterBtnState,
  setFilterBtnState,
  filterTimeState,
  setFilterTimeState,
}: FilterBarProps) => {
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
  );
};

export default FilterBar;
