import React from 'react';
import tw, { styled, css, TwStyle } from 'twin.macro';

type StatusType = 'default' | 'selected' | 'wrong' | 'right';

interface QuizOptionProps {
  option: string;
  status: StatusType;
  onClick: () => void;
}

type OptionStatusType = {
  [index: string]: TwStyle;
  default: TwStyle;
  selected: TwStyle;
  wrong: TwStyle;
  right: TwStyle;
};

const optionStyles: OptionStatusType = {
  default: tw`border-white border-[1px] `,
  selected: tw`bg-primary text-black border-[1px] border-primary`,
  wrong: tw``,
  right: tw``,
};

const Option = styled.div((props: { status: StatusType }) => [
  tw`text-main px-3 py-1 rounded-full box-content`,
  optionStyles[props.status],
]);

const QuizOption = ({ option, status, onClick }: QuizOptionProps) => {
  return (
    <Option status={status} onClick={onClick}>
      <span>{option}</span>
    </Option>
  );
};

export default QuizOption;
