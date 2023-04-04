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
}

const QuizResultPage = ({ quizzes }: QuizResultPageProps) => {
  // 3가지 퀴즈 각각 저장
  const [firstQuiz, setFirstQuiz] = useState<Quiz>(quizzes[0]);
  const [secondQuiz, setSecondQuiz] = useState<Quiz>(quizzes[1]);
  const [thirdQuiz, setThirdQuiz] = useState<Quiz>(quizzes[2]);
  // 선택한 퀴즈 정답
  const [firstAnswer, setFirstAnswer] = useState<null | number>(null);
  const [secondAnswer, setSecondAnswer] = useState<null | number>(null);
  const [thirdAnswer, setThirdAnswer] = useState<null | number>(null);

  return (
    <div>
      <PageTitle title="채점결과" desc="결과를 확인해보세요." />
      <div className="flex flex-col gap-6 py-6">
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
      </div>
    </div>
  );
};

export default QuizResultPage;
