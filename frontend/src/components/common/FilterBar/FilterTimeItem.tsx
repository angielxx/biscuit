import { useState } from 'react';
import tw, { styled } from 'twin.macro';

interface FilterTimeItemProps {
  content: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface onClickProps {
  content: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterTimeItemBtn = styled.button((props: { isHovering: boolean }) => [
  tw`z-10 w-full h-7 rounded-[10px] flex justify-between items-center p-2`,
  props.isHovering === true
    ? tw`bg-primary-var text-tiny-bold text-black`
    : tw`bg-black text-tiny text-primary`,
]);

const onClick = ({ content, setSelected, setIsClicked }: onClickProps) => {
  setSelected(content);
  setIsClicked(false);
};

const FilterTimeItem = ({
  content,
  setSelected,
  setIsClicked,
}: FilterTimeItemProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <FilterTimeItemBtn
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      onClick={() => onClick({ content, setSelected, setIsClicked })}
      isHovering={isHovering}
    >
      {content}
    </FilterTimeItemBtn>
  );
};

export default FilterTimeItem;
