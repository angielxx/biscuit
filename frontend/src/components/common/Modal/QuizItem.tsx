import React, { useState } from 'react';
import QuizOption from '../Modal/QuizOption';
import tw from 'twin.macro';

interface QuizItemProps {
  question: string;
  options: Array<string>;
  onClick: React.Dispatch<React.SetStateAction<number | null>>;
}

const Question = tw.h4`text-h4 text-white`;

const QuizItemContainer = tw.div`flex flex-col gap-2 items-center`;

const OptionsContainer = tw.div`flex flex-wrap gap-2 justify-center items-center`;

const QuizItem = ({ question, options, onClick }: QuizItemProps) => {
  const [clickedOption, setClickedOption] = useState<null | number>(null);

  return (
    <QuizItemContainer>
      <Question>Q. {question}</Question>
      <OptionsContainer>
        {options.map((option, index) => (
          <QuizOption
            key={index}
            option={option}
            status={clickedOption === index ? 'selected' : 'default'}
            onClick={() => {
              onClick(index);
              setClickedOption(index);
            }}
          />
        ))}
      </OptionsContainer>
    </QuizItemContainer>
  );
};

export default QuizItem;
