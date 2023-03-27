import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Component
import FeedBackButton from './FeedBackButton';
import Button from '../Button';

// twin macro
import tw, { styled, css, TwStyle } from 'twin.macro';

// icons
import Close from '../../../assets/icons/close.svg';
import ContentCardItem from '../ContentCardItem';
import QuizItem from './QuizItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { endTimeState, recentContentState, startTimeState } from '../../../recoils/Contents/Atoms';
import QuizResultPage from './QuizResultPage';
import QuizPage from './QuizPage';
import FeedbackPage from './FeedbackPage';

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
  const [page, setPage] = useState(0);
  // 방금 본 컨텐츠
  const [recentContent, setRecentContent] = useRecoilState(recentContentState);

  useEffect(() => {
    // API get 요청 : 퀴즈 제공
  }, []);

  let title;
  let discription;
  switch (page) {
    case 0:
      title = '방금 본 컨텐츠가 어땠는지 알려주세요.';
      discription = '피드백을 주시면 더 정확한 컨텐츠를 받아보실 수 있어요.';
      break;
    case 1:
      title = '잘 이해했는지 확인해보세요.';
      discription = '퀴즈를 풀면 대시보드에 잔디가 자라나요.';
      break;
    case 2:
      title = '채점결과';
      discription = '';
      break;

    default:
      break;
  }

  // 피드백 제출
  const feedbackSubmitHandler = (feedback: number | null) => {
    // API POST 요청 : 피드백 저장
    const startTime = useRecoilValue(startTimeState);
    const endTime = useRecoilValue(endTimeState);
    console.log(endTime - startTime);
    onClose();
  };

  // 퀴즈 제출
  const quizSubmitHandler = () => {
    // API POST 요청 : 퀴즈 제출 내역 저장
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
        {page === 1 && <QuizPage onSubmit={quizSubmitHandler} />}

        {/* 퀴즈 결과 */}
        {page === 2 && <QuizResultPage />}
      </Container>
    </div>
  );
};

export default RecentContentModal;
