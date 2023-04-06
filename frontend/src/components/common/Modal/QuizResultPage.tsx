import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isNoobState } from '../../../recoils/Start/Atoms';

// image
import PageTitle from './PageTitle';
import QuizItem from './QuizItem';

interface Quiz {
  quizId: number;
  question: string;
  multiple_choice: string[];
  answer: number;
}

type AnswerState = {
  [index: number]: number;
};

interface QuizResultPageProps {
  quizzes: Quiz[];
  userAnswers: AnswerState;
}

const QuizResultPage = ({ quizzes, userAnswers }: QuizResultPageProps) => {
  // 로그인 상태
  const [isNoob, setIsNoob] = useRecoilState(isNoobState);
  // 정답
  const [answers, setAnswer] = useState<AnswerState>(userAnswers);
  // 퀴즈
  const [quizState, setQuizState] = useState<Quiz[]>(quizzes);

  const clickQuizOptionHandler = (quizId: number, answer: number) => {};

  return (
    <div>
      <PageTitle title="정답을 확인해보세요" desc="결과를 확인해보세요." />
      <div className="flex flex-col gap-6 pt-6">
        {quizState.length &&
          quizState.map((quiz) => (
            <QuizItem
              key={quiz.quizId}
              quiz={quiz}
              result={true}
              onClick={clickQuizOptionHandler}
              userAnswers={answers}
            />
          ))}
      </div>
    </div>
  );
};

export default QuizResultPage;
