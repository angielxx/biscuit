import React, { useState } from 'react';
import QuizOption from '../Modal/QuizOption';
import tw from 'twin.macro';

type AnswerState = {
  [index: number]: number;
};

interface Quiz {
  quizId: number;
  question: string;
  multiple_choice: string[];
  answer: number;
}

interface QuizItemProps {
  quiz: Quiz;
  onClick: (quizI: number, answer: number) => void;
  result: boolean; // 퀴즈결과 페이지라면 true
  userAnswers: AnswerState;
}

const Question = tw.h4`text-h4 text-white`;

const QuizItemContainer = tw.div`flex flex-col gap-2 items-center`;

const OptionsContainer = tw.div`flex flex-wrap gap-2 justify-center items-center`;

const QuizItem = ({ quiz, onClick, result, userAnswers }: QuizItemProps) => {
  const [clickedOption, setClickedOption] = useState<number>(99);

  const setOptionStatus = (index: number) => {
    // 퀴즈 결과 페이지일 때
    if (result) {
      if (index === userAnswers[quiz.quizId] && index === quiz.answer)
        return 'right';
      if (index === userAnswers[quiz.quizId] && index !== quiz.answer)
        return 'wrong';
      return 'default';
    }
    return clickedOption === index ? 'selected' : 'default';
  };

  return (
    <QuizItemContainer>
      <Question>Q. {quiz.question}</Question>
      <OptionsContainer>
        {quiz.multiple_choice.map((option, index) => (
          <QuizOption
            key={index}
            option={option}
            status={setOptionStatus(index)}
            onClick={() => {
              if (result) return;
              else {
                onClick(quiz.quizId, index);
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
