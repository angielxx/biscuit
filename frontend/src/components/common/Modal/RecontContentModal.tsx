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

type AnswerType = {
  status: boolean; // 유저가 답을 선택했는지에 대한 싱태
  userAnswer: number;
};

type AnswerState = {
  [index: number]: AnswerType;
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
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      quizId: 123,
      question: '첫번째 질문',
      multiple_choice: ['첫번째 보기', '두번째 보기', '세번째 보기'],
      answer: 0,
    },
    {
      quizId: 234,
      question: '두번째 질문',
      multiple_choice: [
        '첫번째 보기입니다.',
        '두번째 보기입니다.',
        '세번째 보기입니다.',
      ],
      answer: 0,
    },
    {
      quizId: 345,
      question: '세번째 질문',
      multiple_choice: [
        '첫번째 보기입니다.',
        '두번째 보기입니다.',
        '세번째 보기입니다.',
      ],
      answer: 0,
    },
  ]);

  // 콘텐츠 소비 시간
  const getTime = useRecoilValue(getTimeSelector);
  // 유저가 선택한 퀴즈의 정답
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

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
      const quizzes = data.quizzes;
      // setQuizzes(data.quizzes);
      setQuizzes([
        {
          quizId: 106,
          question: 'Logstash는 어떤 역할을 하나요?',
          multiple_choice: [
            '서버를 생성하여 아파치 로그를 생성하는 역할을 합니다.',
            'Elasticsearch 클러스터의 데이터를 조회하고 시각화하는 역할을 합니다.',
            '아파치 로그를 Elasticsearch Service 클러스터로 전송하여 데이터를 적재하는 역할을 합니다.',
          ],
          answer: 2,
        },
        {
          quizId: 107,
          question: 'Kibana에서 어떤 기능이 제공되나요?',
          multiple_choice: [
            'Lucene query로 검색이 가능하며, 다양한 기능을 활용하여 데이터 시각화가 가능합니다.',
            '데이터를 전송하는 역할을 합니다.',
            'Visualize를 하나 생성하는 역할을 합니다.',
          ],
          answer: 0,
        },
        {
          quizId: 104,
          question: 'SubAccount란 무엇인가요?',
          multiple_choice: [
            '네이버 클라우드 플랫폼의 인증서비스',
            '네이버 클라우드 플랫폼의 서비스 관리 도구',
            '사용자를 서브 계정으로 등록하고, 특정 서비스에 대한 권한을 부여할 수 있는 상품',
          ],
          answer: 2,
        },
      ]);
    },
    enabled: recentContent.type === 'ARTICLE',
  });

  // 퀴즈 답 POST
  const { mutate: quizMutate } = useMutation({
    mutationFn: (contentId: number) => post_quizzes(contentId),
    onSuccess: (data) => setPage(2), // 퀴즈 제출하고 포인트 정보 받아와야 함
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
    // API POST 요청 : 퀴즈 제출 내역 저장
    quizMutate(recentContent.id);
    setUserAnswers([firstAnswer, secondAnswer, thirdAnswer]);
  };

  return (
    <>
      {recentContent && page !== 2 && (
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-h3 text-primary">방금 본 컨텐츠</h3>
          <ContentCardItem content={recentContent} />
        </div>
      )}
      {page === 2 && (
        <div className="flex flex-col justify-center items-center">
          <img src={seed} alt="" className="aspect-ratio-1 h-20 w-20 mb-3" />
          <span className="text-sub text-dark-grey70">
            포인트를 획득하였습니다!
          </span>
          <h1 className="text-h1">130 (+1)</h1>
        </div>
      )}
      <DivideLine />

      <Container>
        {/* 피드백 */}
        {page === 0 && <FeedbackPage onSubmit={feedbackSubmitHandler} />}

        {/* 퀴즈 */}
        {page === 1 && (
          <QuizPage onSubmit={quizSubmitHandler} quizzes={quizzes} />
        )}

        {/* 퀴즈 결과 */}
        {page === 2 && (
          <QuizResultPage quizzes={quizzes} userAnswers={userAnswers} />
        )}
      </Container>
    </>
  );
};

export default RecentContentModal;
