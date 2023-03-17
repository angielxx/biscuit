import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Component
import FeedBackButton from './FeedBackButton';
import Button from './Button';

// twin macro
import tw, { styled, css, TwStyle } from 'twin.macro';

// icons
import Close from '../../assets/icons/close.svg';
import ContentCardItem from './ContentCardItem';

// Styled component
const Container = styled.div`
  ${tw`flex flex-col gap-2 cursor-pointer`}
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

// Main component
const FeedbackModal = ({ onClose, onSubmit }: FeedbackModalProps) => {
  // 선택된 피드백 번호
  const [feedback, setFeedback] = useState(0);

  // 페이지 (0:피드백, 1:퀴즈, 2:결과)
  const [page, setPage] = useState(0);

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
  const FeedbackSubmitHandler = () => {};

  // 퀴즈 제출
  const QuizSubmitHandler = () => {};

  return (
    <>
      <div id="close-row" className="flex justify-end" onClick={onClose}>
        <img src={Close} alt="" />
      </div>
      <ContentCardItem />
      <hr className="bg-dark-grey-20" />

      <Container id="feedback">
        <h3>{title}</h3>
        <p>피드백을 주시면 더 정확한 컨텐츠를 받아보실 수 있어요.</p>

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
