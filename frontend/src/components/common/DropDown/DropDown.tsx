import { useState, useRef } from 'react';
import tw, { styled, css } from 'twin.macro';
import DropDownList from './DropDownList';

import arrowDropDown from '../../../assets/icons/arrow_drop_down.svg';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

type ItemObj = {
  id: number,
  content: string,
}

interface DropDownProps {
  itemList: ItemObj[];
  placeHolder: string;
}

const DropDownBtn = tw.button
  `w-full h-14 rounded flex justify-between items-center bg-dark-evaluated px-4`;

const ArrowDropDown = styled.div
  `${css`
    width: 24px;
    height: 24px;
    background-size: cover;
    background-image: url("${arrowDropDown}");
    
  `}
`;

const DropDownHolder = styled.span((props: { selected: string }) => [
  props.selected !== ""
    ? tw`text-dark-primary text-main`
    : tw`text-dark-subColor text-sub`
])

/** itemList는 드롭다운 아이템 리스트 {id: number, content:string},
 * placeHolder는 드롭다운 기본 홀더(string)
*/
const DropDown = ({itemList, placeHolder}: DropDownProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    setIsClicked(!isClicked);
  }

  useOnClickOutside(ref, () => setIsClicked(false));

  return (
    <div ref={ref}>
      <DropDownBtn onClick={onClick}>
        <DropDownHolder selected={selected}>{selected !== "" ? selected : placeHolder}</DropDownHolder>
        <ArrowDropDown />
      </DropDownBtn>
      {isClicked
        ? <DropDownList 
          itemList={itemList}
          setSelected={setSelected}
          setIsClicked={setIsClicked} />
        : null
      }
    </div>
  );
}

export default DropDown;