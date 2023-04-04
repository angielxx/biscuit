import React, { useState } from 'react';
import QuizOption from '../Modal/QuizOption';
import tw from 'twin.macro';

interface QuizItemProps {
  question: string;
  options: Array<string>;
  onClick: React.Dispatch<React.SetStateAction<number>>;
  result: boolean; // 퀴즈결과 페이지라면 true
  userAnswer?: number;
  answer?: number;
}

const Question = tw.h4`text-h4 text-white`;

const QuizItemContainer = tw.div`flex flex-col gap-2 items-center`;

const OptionsContainer = tw.div`flex flex-wrap gap-2 justify-center items-center`;

const QuizItem = ({
  question,
  options,
  onClick,
  result,
  userAnswer,
  answer,
}: QuizItemProps) => {
  const [clickedOption, setClickedOption] = useState<number>(99);

  const setOptionStatus = (index: number) => {
    // 퀴즈 결과 페이지일 때
    if (result) {
      if (index === userAnswer && index === answer) return 'right';
      if (index === userAnswer && index !== answer) return 'wrong';
      return 'default';
    }
    return clickedOption === index ? 'selected' : 'default';
  };

  return (
    <QuizItemContainer>
      <Question>Q. {question}</Question>
      <OptionsContainer>
        {options.map((option, index) => (
          <QuizOption
            key={index}
            option={option}
            status={setOptionStatus(index)}
            onClick={() => {
              if (result) return;
              else {
                onClick(index);
                setClickedOption(index);
              }
            }}
          />
        ))}
      </OptionsContainer>
    </QuizItemContainer>
  );
};

export default QuizItem;
