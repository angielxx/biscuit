import { ReactEventHandler, useState } from 'react';
import tw, { styled, css, TwStyle } from 'twin.macro';
import DropDownList from './DropDownList';

import arrowDropDown from '../../assets/icons/arrow_drop_down.svg';

type StatusType = "selected" | "unselected"; 

const DropDownBtn = tw.button
  `w-full h-14 rounded flex justify-between items-center`;

const ArrowDropDown = styled.div
  `${css`
    background-image: ${arrowDropDown};
  `}
`;

const DropDownHolder = styled.span((props: { selected: string }) => [
  props.selected !== ""
    ? tw`text-dark-primary text-sub`
    : tw`text-dark-subColor text-main font-bold`
])

const DropDown = ({itemList, placeHolder}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [selected, setSelected] = useState("");

  const onClick = () => {
    setIsClicked(!isClicked);
  }

  return (
    <div>
      <DropDownBtn onClick={onClick}>
        <DropDownHolder selected={selected}>{selected}</DropDownHolder>
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