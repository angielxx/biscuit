import React from 'react';
import tw, { styled, css, TwStyle } from 'twin.macro';

type StatusType = 'default' | 'selected' | 'wrong' | 'right';

interface QuizOptionProps {
  option: string;
  status: StatusType;
  onClick: () => void;
}

type optionStylesType = {
  [index: string]: TwStyle;
  default: TwStyle;
  selected: TwStyle;
  wrong: TwStyle;
  right: TwStyle;
};

const optionStyles: optionStylesType = {
  default: tw`border-[1px] border-white`,
  selected: tw`border-[1px] border-primary bg-primary text-black text-sub-bold`,
  wrong: tw`bg-danger text-black`,
  right: tw`bg-secondary text-black`,
};

const Option = styled.button((props: { status: StatusType }) => [
  tw`text-sub px-3 rounded-full py-1 px-3 cursor-pointer text-center`,
  optionStyles[props.status],
]);

const QuizOption = ({ option, status, onClick }: QuizOptionProps) => {
  return (
    <Option status={status} onClick={() => onClick()}>
      <span>{option}</span>
    </Option>
  );
};

export default QuizOption;
