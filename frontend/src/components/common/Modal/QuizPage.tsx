import React, { useEffect, useState } from 'react';

// Recoil
import { isNoobState } from '../../../recoils/Start/Atoms';

// Component
import Button from '../Button';
import PageTitle from './PageTitle';
import QuizItem from './QuizItem';

// Type
interface Quiz {
  quizId: number;
  question: string;
  multiple_choice: string[];
  answer: number;
}

interface QuizPageProps {
  onSubmit: (answers: AnswerState) => void;
  quizzes: Quiz[];
}

type AnswerState = {
  [index: number]: number;
};

type StatusType = 'active' | 'disabled' | 'danger' | 'activeHover';

// Main Component
const QuizPage = ({ onSubmit, quizzes }: QuizPageProps) => {
  // 퀴즈에 대해 유저가 선택한 답 저장
  const [answers, setAnswers] = useState<AnswerState>({});
  // 제출 버튼 상태
  const [btnStatus, setBtnStatus] = useState<StatusType>('disabled');

  // answer 초기값 설정
  useEffect(() => {
    // console.log(quizzes);
    quizzes?.forEach((quiz) =>
      setAnswers((prev) => {
        prev[quiz.quizId] = -1;
        return prev;
      })
    );
    // console.log(answers);
  }, [quizzes]);

  const clickQuizOptionHandler = (quizId: number, answer: number) => {
    setAnswers((prev) => {
      prev[quizId] = answer;
      return prev;
    });
    // 버튼 상태 설정
    const allStatus = Object.values(answers).every((answer) => answer !== -1);
    if (allStatus) setBtnStatus('active');
    else setBtnStatus('disabled');
    // console.log(allStatus);
  };

  return (
    <>
      {quizzes.length ? (
        <>
          <PageTitle
            title="퀴즈를 풀고 잘 이해했는지 확인해보세요"
            desc={
              isNoobState
                ? '로그인을 하시면 정답을 확인할 수 있어요.'
                : '퀴즈를 풀면 오늘의 잔디가 자라나요.'
            }
          />
          <div className="flex flex-col gap-6 py-6">
            {quizzes.length &&
              quizzes.map((quiz) => (
                <QuizItem
                  key={quiz.quizId}
                  quiz={quiz}
                  onClick={clickQuizOptionHandler}
                  result={false}
                  userAnswers={{}}
                />
              ))}
          </div>
          <Button
            title="다 풀었어요"
            status={btnStatus}
            onClick={() => onSubmit(answers)}
          />
        </>
      ) : (
        <div>
          <span>아쉽게도 이 글의 퀴즈가 아직 없어요</span>
        </div>
      )}
    </>
  );
};

export default QuizPage;
