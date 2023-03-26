import React, { useState } from 'react';
import Button from '../Button';
import QuizItem from './QuizItem';

interface Quiz {
  quizId: number;
  question: string;
  multiple_choice: Array<string>;
  answer: number;
}

interface QuizPageProps {
  onSubmit: () => void;
}
const QuizPage = ({ onSubmit }: QuizPageProps) => {
  // 3가지 퀴즈 각각 저장
  const [firstQuiz, setFirstQuiz] = useState<Quiz>({
    quizId: 0,
    question: '',
    multiple_choice: [],
    answer: 0,
  });
  const [secondQuiz, setSecondQuiz] = useState<Quiz>({
    quizId: 0,
    question: '',
    multiple_choice: [],
    answer: 0,
  });
  const [thirdQuiz, setThirdQuiz] = useState<Quiz>({
    quizId: 0,
    question: '',
    multiple_choice: [],
    answer: 0,
  });

  // 선택한 퀴즈 정답
  const [firstAnswer, setFirstAnswer] = useState<null | number>(null);
  const [secondAnswer, setSecondAnswer] = useState<null | number>(null);
  const [thirdAnswer, setThirdAnswer] = useState<null | number>(null);

  return (
    <>
      <QuizItem
        question={firstQuiz.question}
        options={firstQuiz.multiple_choice}
        onClick={setFirstAnswer}
      />
      <QuizItem
        question={secondQuiz.question}
        options={secondQuiz.multiple_choice}
        onClick={setSecondAnswer}
      />
      <QuizItem
        question={thirdQuiz.question}
        options={thirdQuiz.multiple_choice}
        onClick={setThirdAnswer}
      />
      <Button title="다 풀었어요" status="active" onClick={onSubmit} />
    </>
  );
};

export default QuizPage;
