import { useState, useRef, useEffect } from 'react';
import tw, { styled, css } from 'twin.macro';

import FilterTimeList from './FilterTimeList';

import arrowDropDown from '../../../assets/icons/arrow_drop_down.svg';
import cancel from  '../../../assets/icons/cancel.svg';

import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useRecoilState } from 'recoil';
import { filterTimeSelectedState } from '../../../recoils/Home/Atoms';

type ItemObj = {
  id: number;
  content: string;
  status: boolean;
}

interface FilterTimeProps {
  filterTimeState: ItemObj[];
  setFilterTimeState: React.Dispatch<React.SetStateAction<ItemObj[]>>;
}

const FilterTimeContainer = tw.div`
  h-14 flex-col justify-between py-4 bg-black
`;

const ArrowDropDown = styled.div
  `${css`
    width: 24px;
    height: 24px;
    background-color: #3FE5EF;
    mask-size: cover;
    mask-image: url("${arrowDropDown}");    
  `}
`;

// X 이미지가 들어갈 예정입니다.
const CancleBtn = styled.div
  `${css`
    width: 24px;
    height: 24px;
    background-color: black;
    mask-size: cover;
    mask-image: url("${cancel}");    
  `}
`;

const FilterTimeBtn = styled.button((props: { selected: string }) => [
  tw`w-[128px] h-9 flex rounded-full justify-between items-center pl-[14px] pr-[10px] py-4 border-[1px] border-dark-primary`,
  props.selected === ""
    ? tw`bg-black`
    : tw`bg-dark-primary`
]);

const FilterTimeHolder = styled.span((props: { selected: string }) => [
  tw`text-tiny-bold truncate w-18 text-start`,
  props.selected === ""
    ? tw`text-dark-primary`
    : tw`text-black`
]);

const FilterTime = ({filterTimeState, setFilterTimeState}: FilterTimeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selected, setSelected] = useRecoilState(filterTimeSelectedState);

  const onClickCancle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelected("");
  }

  const onClick = () => {
    setIsClicked(!isClicked);
  }

  useEffect(() => {
    const newFilterTimeState:ItemObj[] = [
      {id: 0, content: "5분 미만", status: false},
      {id: 1, content: "5분 ~ 10분 미만", status: false},
      {id: 2, content: "10분 ~ 20분 미만", status: false},
      {id: 3, content: "20분 ~ 30분 미만", status: false},
      {id: 4, content: "30분 ~ 1시간 미만", status: false},
      {id: 5, content: "1시간 이상", status: false},
    ];
    newFilterTimeState.map((state) => {
      if(state.content === selected) {
        state.status = true;
      }
    })
    setFilterTimeState(newFilterTimeState);
  }, [selected])

  useOnClickOutside(ref, () => setIsClicked(false));

  return (
    <FilterTimeContainer ref={ref}>
      <FilterTimeBtn onClick={onClick} selected={selected}>
        <FilterTimeHolder selected={selected}>
          { selected === ""
            ? "컨텐츠 길이"
            : selected
          }
        </FilterTimeHolder>
        { selected === ""
          ? <ArrowDropDown />
          : <CancleBtn onClick={onClickCancle}/>
        }
      </FilterTimeBtn>
      {isClicked
        ? <FilterTimeList
        itemList={filterTimeState}
        setSelected={setSelected}
        setIsClicked={setIsClicked} />
        : null
      }
    </FilterTimeContainer>
  )
}

export default FilterTime;