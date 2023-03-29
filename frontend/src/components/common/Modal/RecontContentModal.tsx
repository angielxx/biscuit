import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

// twin macro
import tw, { styled, css, TwStyle } from 'twin.macro';

// icons
import Close from '../../../assets/icons/close.svg';
import ContentCardItem from '../ContentCardItem';
import QuizItem from './QuizItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  getTimeSelector,
  recentContentState,
  startTimeState,
} from '../../../recoils/Contents/Atoms';
import QuizResultPage from './QuizResultPage';
import QuizPage from './QuizPage';
import FeedbackPage from './FeedbackPage';
import { post_feedback } from '../../../api/feedback';
import { get_quizzes, post_quizzes } from '../../../api/quiz';

// Styled component
const Container = styled.div`
  ${tw`flex flex-col`}
  & {
    h4 {
      ${tw`text-h4`}
    }
    p {
      ${tw`text-subColor text-sub`}
    }
  }
`;

const DivideLine = styled.hr`
  ${tw`bg-dark-grey20 h-[1px]`}
  ${css`
    border: 0;
  `}
`;

// interface
interface FeedbackModalProps {
  onClose: () => void;
}

interface content {
  id: number;
  title: string;
  url: string;
  creditBy: string;
  createdDate: string;
  timeCost: number;
  type: string;
  marked: boolean;
  tags: Array<string> | null;
  hit: number;
}

interface Quiz {
  quizId: number;
  question: string;
  multiple_choice: Array<string>;
  answer: number;
}

// Main component
const RecentContentModal = ({ onClose }: FeedbackModalProps) => {
  // 페이지 (0:피드백, 1:퀴즈, 2:결과)
  const [page, setPage] = useState<number>(0);
  // 방금 본 컨텐츠
  const [recentContent, setRecentContent] = useRecoilState(recentContentState);
  // 퀴즈
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      quizId: 0,
      question: '두번째 질문',
      multiple_choice: ['첫번째 보기', '두번째 보기', '세번째 보기'],
      answer: 0,
    },
    {
      quizId: 0,
      question: '두번째 질문',
      multiple_choice: [
        '첫번째 보기입니다.',
        '두번째 보기입니다.',
        '세번째 보기입니다.',
      ],
      answer: 0,
    },
    {
      quizId: 0,
      question: '두번째 질문',
      multiple_choice: [
        '첫번째 보기입니다.',
        '두번째 보기입니다.',
        '세번째 보기입니다.',
      ],
      answer: 0,
    },
  ]);

  useEffect(() => {
    // API get 요청 : 퀴즈 제공
  }, []);

  interface mutateParams {
    contentId: number;
    feedback: number | null;
    timecost: number;
  }

  // 피드백 POST
  const { mutate: feedbackMutate } = useMutation({
    mutationFn: ({ contentId, feedback, timecost }: mutateParams) =>
      post_feedback(contentId, feedback, timecost),
  });

  // 퀴즈 답 POST
  const { mutate: quizMutate } = useMutation({
    mutationFn: (contentId: number) => post_quizzes(contentId),
  });

  // 퀴즈 GET
  const { data } = useQuery({
    queryKey: ['get_quizzes', recentContent.id],
    queryFn: () => get_quizzes(recentContent.id),
    onSuccess: (data) => setQuizzes(data.quizzes),
  });

  // 피드백 제출
  const feedbackSubmitHandler = (feedback: number | null) => {
    // timecost 설정 필요
    const timecost = 1;
    // API POST 요청 : 피드백 저장
    feedbackMutate({ contentId: recentContent.id, feedback, timecost });
    onClose();
  };

  // 퀴즈 제출
  const quizSubmitHandler = (
    firstAnswer: number | null,
    secondAnswer: number | null,
    thirdAnswer: number | null
  ) => {
    // API POST 요청 : 퀴즈 제출 내역 저장
    console.log('answer :', firstAnswer, secondAnswer, thirdAnswer);
    console.log(firstAnswer && secondAnswer);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-h3 text-primary">방금 본 컨텐츠</h3>
      {recentContent && <ContentCardItem content={recentContent} />}
      <DivideLine />

      <Container>
        {/* 피드백 */}
        {page === 0 && <FeedbackPage onSubmit={feedbackSubmitHandler} />}

        {/* 퀴즈 */}
        {page === 1 && (
          <QuizPage onSubmit={quizSubmitHandler} quizzes={quizzes} />
        )}

        {/* 퀴즈 결과 */}
        {page === 2 && <QuizResultPage />}
      </Container>
    </div>
  );
};

export default RecentContentModal;
