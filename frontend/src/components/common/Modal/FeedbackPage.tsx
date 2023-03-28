import React, { useState } from 'react';

// image
import neutral_face from '../../../assets/image/neutral-face.png';
import smiling_face from '../../../assets/image/smiling-face.png';
import grinning_face from '../../../assets/image/grinning-face.png';

// twin macro
import tw, { styled, css, TwStyle } from 'twin.macro';
import Button from '../Button';
import FeedBackButton from './FeedBackButton';

const FeedbackBtns = styled.div`
  ${tw`flex justify-center items-start p-6 gap-4 h-fit w-full`}
`;

const FeedbackBtn = styled.button<{ status: string }>`
  ${tw`bg-dark-grey30 hover:bg-dark-primary-var rounded-full aspect-h-1 aspect-w-1 min-w-[40px] max-w-[60px] p-2`}
  ${({ status }) => FeedbackBtnStyles[status]}
  & {
    img {
      ${tw`aspect-h-1 aspect-w-1 p-0`}
    }
  }
`;

type FeedbackBtnStylesType = {
  [index: string]: TwStyle;
  default: TwStyle;
  clicked: TwStyle;
};
const FeedbackBtnStyles: FeedbackBtnStylesType = {
  default: tw`bg-dark-grey30 hover:bg-dark-primary-var`,
  clicked: tw`bg-dark-primary hover:bg-dark-primary-var`,
};

interface FeedbackPageProps {
  onSubmit: (feedback: number | null) => void;
}

const FeedbackPage = ({ onSubmit }: FeedbackPageProps) => {
  // 선택된 피드백 번호
  const [feedback, setFeedback] = useState<number | null>(null);

  return (
    <>
      <div className="flex flex-col gap-2 break-keep">
        <h4>방금 본 컨텐츠가 어땠는지 알려주세요.</h4>
        <p>피드백을 주시면 더 정확한 컨텐츠를 받아보실 수 있어요.</p>
      </div>
      <FeedbackBtns>
        {['쉬웠어요', '적당해요', '어려웠어요'].map((text, index) => {
          const emoji = [neutral_face, smiling_face, grinning_face];

          return (
            <div className="flex flex-col items-center gap-2">
              <FeedbackBtn
                status={feedback === index ? 'clicked' : 'default'}
                onClick={() =>
                  setFeedback((prev) => {
                    if (prev === index) return null;
                    else return index;
                  })
                }
              >
                <img src={emoji[index]} alt="너무 쉬워요 이모티콘" />
              </FeedbackBtn>
              <span className="text-dark-grey80 text-tiny">{text}</span>
            </div>
          );
        })}
      </FeedbackBtns>
      <Button
        title="선택 완료"
        status={feedback ? 'active' : 'disabled'}
        onClick={() => {
          if (feedback) onSubmit(feedback);
        }}
      />
      {/* <Button
        title="퀴즈 풀래요"
        status="active"
        onClick={() => onSubmit(feedback)}
      /> */}
    </>
  );
};

export default FeedbackPage;
