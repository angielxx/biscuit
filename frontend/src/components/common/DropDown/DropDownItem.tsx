import { useState } from 'react';
import tw, { styled, css, TwStyle } from 'twin.macro';

interface DropDownItemProps {
  key: number;
  content: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface onClickProps {
  content: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const onClick = ({content, setSelected, setIsClicked}: onClickProps) => {
  setSelected(content);
  setIsClicked(false);
}

const DropDownItemBtn = styled.button((props: { isHovering: boolean }) => [
  props.isHovering === true
    ? tw`w-full h-14 rounded flex justify-between items-center bg-dark-primary-var px-4 text-main-bold text-black`
    : tw`w-full h-14 rounded flex justify-between items-center bg-dark-evaluated px-4 text-main text-dark-primary`
])

const DropDownItem = ({key, content, setSelected, setIsClicked}: DropDownItemProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <DropDownItemBtn
    onMouseOver={() => setIsHovering(true)}
    onMouseOut={() => setIsHovering(false)}
    onClick={() => onClick({content, setSelected, setIsClicked})}
    isHovering={isHovering}>
      {content}
    </DropDownItemBtn>
  );
}

export default DropDownItem;