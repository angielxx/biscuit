import React, { useEffect, useState } from 'react';
import Button from '../Button';
import PageTitle from './PageTitle';
import QuizItem from './QuizItem';

interface Quiz {
  quizId: number;
  question: string;
  multiple_choice: string[];
  answer: number;
}

interface QuizPageProps {
  onSubmit: (
    firstAnswer: number,
    secondAnswer: number,
    thirdAnswer: number
  ) => void;
  quizzes: Quiz[];
}

const QuizPage = ({ onSubmit, quizzes }: QuizPageProps) => {
  // 3가지 퀴즈 각각 저장
  const [firstQuiz, setFirstQuiz] = useState<Quiz>(quizzes[0]);
  const [secondQuiz, setSecondQuiz] = useState<Quiz>(quizzes[1]);
  const [thirdQuiz, setThirdQuiz] = useState<Quiz>(quizzes[2]);

  useEffect(() => {
    setFirstQuiz(quizzes[0]);
    setSecondQuiz(quizzes[1]);
    setThirdQuiz(quizzes[2]);
  }, []);

  // 선택한 퀴즈 정답
  const [firstAnswer, setFirstAnswer] = useState<number>(99);
  const [secondAnswer, setSecondAnswer] = useState<number>(99);
  const [thirdAnswer, setThirdAnswer] = useState<number>(99);

  return (
    <>
      <PageTitle
        title="방금 본 컨텐츠를 잘 이해했는지 확인해보세요."
        desc="퀴즈를 제출하면 오늘의 잔디가 자라나요."
      />
      <div className="flex flex-col gap-6 py-6">
        <QuizItem
          question={firstQuiz.question}
          options={firstQuiz.multiple_choice}
          onClick={setFirstAnswer}
          result={false}
        />
        <QuizItem
          question={secondQuiz.question}
          options={secondQuiz.multiple_choice}
          onClick={setSecondAnswer}
          result={false}
        />
        <QuizItem
          question={thirdQuiz.question}
          options={thirdQuiz.multiple_choice}
          onClick={setThirdAnswer}
          result={false}
        />
      </div>
      <Button
        title="다 풀었어요"
        status={
          firstAnswer !== null && secondAnswer !== null && thirdAnswer !== null
            ? 'active'
            : 'disabled'
        }
        onClick={() => onSubmit(firstAnswer, secondAnswer, thirdAnswer)}
      />
    </>
  );
};

export default QuizPage;
