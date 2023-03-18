import { useState } from "react";
import tw from 'twin.macro';

interface FilterBtnProps {
  filterBtnState: boolean[];
  setFilterBtnState: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const FilterBtnContainer = tw.div`
  w-full h-14 flex justify-between items-center px-4
`;

const FilterBtnList = ({filterBtnState, setFilterBtnState}: FilterBtnProps) => {
  const [onClicked, setOnClicked] = useState([false, false]);
  
  return (
    <FilterBtnContainer>

    </FilterBtnContainer>
  )
}

export default FilterBtnList;