import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Component
import FeedBackButton from './FeedBackButton';
import Button from './Button';

// twin macro
import tw, { styled, css, TwStyle } from 'twin.macro';

// icons
import Close from '../../assets/icons/close.svg';
import ContentCardItem from './ContentCardItem';
import QuizItem from './QuizItem';

// Styled component
const Container = styled.div`
  ${tw`flex flex-col gap-4 cursor-pointer`}
  & {
    h3 {
      ${tw`text-h3`}
    }
    p {
      ${tw`text-subColor text-sub`}
    }
  }
`;

const FeedbackBtns = styled.div`
  ${tw`flex justify-center items-start py-4 gap-2 `}
`;

// interface
interface FeedbackModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

interface RecentContentState {
  image: string;
  url: string;
  channelImg: string;
  title: string;
  author: string;
  date: string;
  isMarked: boolean;
  tags: Array<string>;
}

interface Quiz {
  quizId: number;
  question: string;
  multiple_choice: Array<string>;
  answer: number;
}
type QuizesState = Array<Quiz>;

// Main component
const FeedbackModal = ({ onClose, onSubmit }: FeedbackModalProps) => {
  // 선택된 피드백 번호
  const [feedback, setFeedback] = useState(0);
  // 페이지 (0:피드백, 1:퀴즈, 2:결과)
  const [page, setPage] = useState(1);
  // 방금 본 컨텐츠
  const [recentContent, setRecentContent] = useState<RecentContentState>({
    image: '',
    url: '',
    channelImg: '',
    title: '',
    author: '',
    date: '',
    isMarked: false,
    tags: [],
  });
  // 컨텐츠에 대한 퀴즈
  const [quizes, setQuizes] = useState<QuizesState>();
  // 선택한 퀴즈 정답
  const [selectedOptionForFirst, setSelectedOptionForFirst] = useState(null);
  const [selectedOptionForSecond, setSelectedOptionForSecond] = useState(null);
  const [selectedOptionForThird, setSelectedOptionForThird] = useState(null);

  useEffect(() => {
    // API get 요청 : 컨텐츠 조회
    setRecentContent({
      image:
        'https://content.surfit.io/thumbs/image/5eQZ5/Wknoy/1126431375640856ffc9068.png/cover-center-1x.webp',
      url: 'https://content.surfit.io/thumbs/image/5eQZ5/Wknoy/1126431375640856ffc9068.png/cover-center-1x.webp',
      channelImg: '',
      title: '리액트와 관련한 콘텐츠의 제목입니다.',
      author: '작성자',
      date: '2022.11.25',
      isMarked: false,
      tags: ['React', 'Zotai'],
    });
    // API get 요청 : 퀴즈 제공
    setQuizes([
      {
        quizId: 0,
        question: '질문0',
        multiple_choice: ['보기0', '보기1', '보기2'],
        answer: 0,
      },
      {
        quizId: 1,
        question: '질문1',
        multiple_choice: ['보기0', '보기1', '보기2'],
        answer: 1,
      },
      {
        quizId: 2,
        question: '질문2',
        multiple_choice: ['보기0', '보기1', '보기2'],
        answer: 2,
      },
    ]);
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

  // 피드백 버튼 눌렀을 때
  const feedbackClickHandler = (num: number) => {
    setFeedback(num);
  };

  // 피드백 제출
  const FeedbackSubmitHandler = () => {
    // API POST 요청 : 피드백 저장
  };

  // 퀴즈 제출
  const QuizSubmitHandler = () => {
    // API POST 요청 : 퀴즈 제출 내역 저장
  };

  return (
    <>
      <div id="close-row" className="flex justify-end" onClick={onClose}>
        <img src={Close} alt="" />
      </div>
      {recentContent && <ContentCardItem recentContent={recentContent} />}
      <hr className="bg-dark-grey-20" />

      <Container id="feedback">
        <div className="flex flex-col gap-2">
          <h3>{title}</h3>
          <p>피드백을 주시면 더 정확한 컨텐츠를 받아보실 수 있어요.</p>
        </div>

        {/* 피드백 */}
        {page === 0 && (
          <>
            <FeedbackBtns>
              {[1, 2, 3, 4, 5].map((num) => {
                return (
                  <FeedBackButton
                    key={num}
                    number={num}
                    filled={feedback >= num ? true : false}
                    onClick={() => {
                      setFeedback(num);
                    }}
                  />
                );
              })}
            </FeedbackBtns>
            <Button
              title="퀴즈 풀래요"
              status="active"
              onClick={FeedbackSubmitHandler}
            />
          </>
        )}

        {/* 퀴즈 */}
        {page === 1 && (
          <>
            {quizes &&
              quizes.map((quiz, index) => (
                <QuizItem
                  key={index}
                  question={quiz.question}
                  options={quiz.multiple_choice}
                />
              ))}
            <Button
              title="다 풀었어요"
              status="active"
              onClick={FeedbackSubmitHandler}
            />
          </>
        )}

        {/* 퀴즈 결과 */}
        {page === 2 && <></>}
      </Container>
    </>
  );
};

export default FeedbackModal;
