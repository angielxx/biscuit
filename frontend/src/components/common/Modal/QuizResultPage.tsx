import React, { useState } from 'react';

// image
import PageTitle from './PageTitle';
import QuizItem from './QuizItem';

interface Quiz {
  quizId: number;
  question: string;
  multiple_choice: string[];
  answer: number;
}

interface QuizResultPageProps {
  quizzes: Quiz[];
  userAnswers: number[];
}

const QuizResultPage = ({ quizzes, userAnswers }: QuizResultPageProps) => {
  // 3가지 퀴즈 각각 저장
  const [firstQuiz, setFirstQuiz] = useState<Quiz>(quizzes[0]);
  const [secondQuiz, setSecondQuiz] = useState<Quiz>(quizzes[1]);
  const [thirdQuiz, setThirdQuiz] = useState<Quiz>(quizzes[2]);
  // 선택한 퀴즈 정답
  const [firstAnswer, setFirstAnswer] = useState<number>(99);
  const [secondAnswer, setSecondAnswer] = useState<number>(99);
  const [thirdAnswer, setThirdAnswer] = useState<number>(99);

  return (
    <div>
      <PageTitle title="채점결과" desc="결과를 확인해보세요." />
      <div className="flex flex-col gap-6 pt-6">
        <QuizItem
          question={firstQuiz.question}
          options={firstQuiz.multiple_choice}
          onClick={setFirstAnswer}
          result={true}
          userAnswer={userAnswers[0]}
          answer={firstQuiz.answer}
        />
        <QuizItem
          question={secondQuiz.question}
          options={secondQuiz.multiple_choice}
          onClick={setSecondAnswer}
          result={true}
          userAnswer={userAnswers[1]}
          answer={secondQuiz.answer}
        />
        <QuizItem
          question={thirdQuiz.question}
          options={thirdQuiz.multiple_choice}
          onClick={setThirdAnswer}
          result={true}
          userAnswer={userAnswers[2]}
          answer={thirdQuiz.answer}
        />
      </div>
    </div>
  );
};

export default QuizResultPage;
