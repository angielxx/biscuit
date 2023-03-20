import React, { useState } from 'react';
import QuizOption from './QuizOption';
import tw from 'twin.macro';

interface QuizItemProps {
  question: string;
  options: Array<string>;
}

const Question = tw.h4`text-h4 text-white`;

const QuizItemContainer = tw.div`flex flex-col gap-2 items-center`;

const OptionsContainer = tw.div`flex flex-wrap gap-2`;

const QuizItem = ({ question, options }: QuizItemProps) => {
  const [clickedOption, setClickedOption] = useState(null);
  return (
    <QuizItemContainer>
      <Question>Q. {question}</Question>
      <OptionsContainer>
        {options.map((option, index) => (
          <QuizOption
            key={index}
            option={option}
            status={clickedOption === index ? 'selected' : 'default'}
          />
        ))}
      </OptionsContainer>
    </QuizItemContainer>
  );
};

export default QuizItem;
