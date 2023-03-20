import React from 'react';
import tw, { styled, css } from 'twin.macro';

type StatusType = 'default' | 'selected' | 'wrong' | 'right';

interface QuizOptionProps {
  option: string;
  status: StatusType;
}

const optionStyles = {
  default: tw`bg-primary`,
  selected: tw``,
  wrong: tw``,
  right: tw``,
};

const Option = styled.div((props: { status: StatusType }) => [
  tw`text-main px-3`,
  optionStyles[status],
]);

const QuizOption = ({ option, status }: QuizOptionProps) => {
  return (
    <Option status={status}>
      <span>{option}</span>
    </Option>
  );
};

export default QuizOption;
