import { useState, useRef, useEffect } from 'react';
import tw, { styled, css } from 'twin.macro';

import FilterTimeList from './FilterTimeList';

import arrowDropDown from '../../../assets/icons/arrow_drop_down.svg';
import cancel from '../../../assets/icons/cancel.svg';

import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useRecoilState } from 'recoil';
import { filterTimeSelectedState } from '../../../recoils/Home/Atoms';

type sort = {
  id: number;
  content: string;
  status: boolean;
};

interface FilterTimeProps {
  filterSortState: sort[];
  setFilterSortState: React.Dispatch<React.SetStateAction<sort[]>>;
  setOption: React.Dispatch<React.SetStateAction<'recent' | 'hit'>>;
}

const FilterTimeContainer = tw.div`
  h-14 flex-col justify-between py-4 bg-black
`;

const ArrowDropDown = styled.div`
  ${css`
    width: 24px;
    height: 24px;
    background-color: #3fe5ef;
    mask-size: cover;
    mask-image: url('${arrowDropDown}');
  `}
`;

const FilterTimeBtn = tw.button`
  w-[128px] h-9 flex rounded-full justify-between items-center pl-[14px] pr-[10px] py-4 border-[1px] border-dark-primary bg-black
`;

const FilterTimeHolder = tw.span`
  text-tiny-bold truncate w-18 text-start text-dark-primary
`;

const FilterSort = ({
  filterSortState,
  setFilterSortState,
  setOption,
}: FilterTimeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('최신순');

  const onClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const newFilterTimeState: sort[] = [
      { id: 0, content: '최신순', status: false },
      { id: 1, content: '인기순', status: false },
    ];
    newFilterTimeState.map((state) => {
      if (state.content === selected) {
        state.status = true;
      }
    });
    setFilterSortState(newFilterTimeState);
    setOption(selected === '최신순' ? 'recent' : 'hit');
  }, [selected]);

  useOnClickOutside(ref, () => setIsClicked(false));

  return (
    <FilterTimeContainer ref={ref}>
      <FilterTimeBtn onClick={onClick}>
        <FilterTimeHolder>{selected}</FilterTimeHolder>
        <ArrowDropDown />
      </FilterTimeBtn>
      {isClicked ? (
        <FilterTimeList
          itemList={filterSortState}
          setSelected={setSelected}
          setIsClicked={setIsClicked}
        />
      ) : null}
    </FilterTimeContainer>
  );
};

export default FilterSort;
