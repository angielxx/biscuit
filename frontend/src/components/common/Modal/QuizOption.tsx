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
  default: tw`bg-primary`,
  selected: tw``,
  wrong: tw``,
  right: tw``,
};

const Option = styled.div((props: { status: StatusType }) => [
  tw`text-main px-3`,
  optionStyles[status],
]);

const QuizOption = ({ option, status, onClick }: QuizOptionProps) => {
  return (
    <Option status={status}>
      <span>{option}</span>
    </Option>
  );
};

export default QuizOption;
