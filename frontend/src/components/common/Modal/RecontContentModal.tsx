import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'typescript-cookie';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  getTimeSelector,
  recentContentState,
} from '../../../recoils/Contents/Atoms';
import { isNoobState } from '../../../recoils/Start/Atoms';

// twin macro
import tw, { styled, css, TwStyle } from 'twin.macro';

// icons
import Close from '../../../assets/icons/close.svg';
import seed from '../../../assets/image/seed.png';
import eyes from '../../../assets/image/eyes.png';

// component
import ContentCardItem from '../ContentCardItem';
import QuizItem from './QuizItem';
import QuizResultPage from './QuizResultPage';
import QuizPage from './QuizPage';
import FeedbackPage from './FeedbackPage';

// API
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
  ${tw`bg-dark-grey20 h-[1px] my-4`}
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
  source: string; // 영상: video_id, 글: url
  creditBy: string;
  createdDate: string;
  timeCost: number;
  type: string;
  marked: boolean;
  tags: Array<string> | null;
  hit: number;
  img: string;
}

interface Quiz {
  quizId: number;
  question: string;
  multiple_choice: Array<string>;
  answer: number;
}

type AnswerState = {
  [index: number]: number;
};

// Main component
const RecentContentModal = ({ onClose }: FeedbackModalProps) => {
  // 페이지 (0:피드백, 1:퀴즈, 2:결과)
  const [page, setPage] = useState<number>(0);
  // 방금 본 컨텐츠
  const [recentContent, setRecentContent] = useRecoilState(recentContentState);
  // 로그인 상태
  const [isNoob, setIsNoob] = useRecoilState(isNoobState);
  // 퀴즈
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  // 콘텐츠 소비 시간
  const getTime = useRecoilValue(getTimeSelector);
  // 유저가 선택한 퀴즈의 정답
  const [userAnswers, setUserAnswers] = useState<AnswerState>({});

  // useEffect(() => {
  //   setIsNoob(false);
  // }, []);

  interface mutateParams {
    contentId: number;
    feedback: number | null;
    timecost: number;
  }

  // 피드백 POST
  const { mutate: feedbackMutate } = useMutation({
    mutationFn: ({ contentId, feedback, timecost }: mutateParams) =>
      post_feedback(contentId, feedback, timecost),
    onSuccess: () => {
      if (recentContent.type === 'ARTICLE') setPage(1);
      else onClose();
    },
  });

  // 퀴즈 GET
  const {
    data,
    isError: isGetQuizError,
    isSuccess: isGetQuizSuccess,
  } = useQuery({
    queryKey: ['get_quizzes', recentContent.id],
    queryFn: () => get_quizzes(recentContent.id),
    onSuccess: (data) => {
      const quizzes = data.quizzes.filter((quiz: Quiz) => quiz.answer !== -1);
      setQuizzes(data.quizzes);
    },
    // enabled: recentContent.type === 'ARTICLE',
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 5,
  });

  // 퀴즈 답 POST
  interface QuizMutateParam {
    contentId: number;
    userAnswers: AnswerState;
  }
  type BodyType = {
    answers: AnswerType[];
  };
  type AnswerType = {
    quizId: number;
    answer: boolean;
  };
  const { mutate: quizMutate } = useMutation({
    mutationFn: ({ contentId, userAnswers }: QuizMutateParam) => {
      const body: BodyType = { answers: [] };
      for (let quiz of quizzes) {
        body.answers.push({
          quizId: quiz.quizId,
          answer: quiz.answer === userAnswers[quiz.quizId],
        });
      }
      return post_quizzes(contentId, body);
    },
    onSuccess: (data) => {
      console.log('퀴즈제출데이터 :', data);
    }, // 퀴즈 제출하고 포인트 정보 받아와야 함
  });

  // 피드백 제출
  const feedbackSubmitHandler = (feedback: number | null) => {
    // timecost 설정 필요
    const timecost = Math.ceil(getTime / (60 * 1000));
    // API POST 요청 : 피드백 저장
    feedbackMutate({ contentId: recentContent.id, feedback, timecost });
  };

  // 퀴즈 제출

  const quizSubmitHandler = (answers: AnswerState) => {
    // 회원일 때만 퀴즈 제출
    if (!isNoob)
      quizMutate({ contentId: recentContent.id, userAnswers: answers });
    setUserAnswers(answers);
    setPage(2);
    console.log('quiz submit isNoob :', isNoob);
  };

  return (
    <>
      {recentContent && page !== 2 && (
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-h3 text-primary">방금 본 컨텐츠</h3>
          <ContentCardItem content={recentContent} />
        </div>
      )}
      {page === 2 && !isNoob && (
        <div className="flex flex-col justify-center items-center">
          <img src={seed} alt="" className="aspect-ratio-1 h-20 w-20 mb-3" />
          <span className="text-sub text-dark-grey70">
            포인트를 획득하였습니다!
          </span>
          <h1 className="text-h1">130 (+1)</h1>
        </div>
      )}
      {page === 2 && isNoob && (
        <div className="flex flex-col justify-center items-center">
          <img src={eyes} alt="" className="aspect-ratio-1 h-20 w-20 mb-3" />
          <h1 className="text-h3 text-center mb-5">
            로그인하고 <br />
            정답을 확인해보세요!
          </h1>
        </div>
      )}
      {page !== 2 && <DivideLine />}

      <Container>
        {/* 피드백 */}
        {page === 0 && (
          <FeedbackPage
            onSubmit={feedbackSubmitHandler}
            quizStatus={recentContent.type === 'VIDEO' ? false : true}
          />
        )}

        {/* 퀴즈 */}
        {page === 1 && (
          <QuizPage onSubmit={quizSubmitHandler} quizzes={quizzes} />
        )}

        {/* 퀴즈 결과 */}
        {page === 2 && !isNoob && (
          <QuizResultPage quizzes={quizzes} userAnswers={userAnswers} />
        )}
      </Container>
    </>
  );
};

export default RecentContentModal;
