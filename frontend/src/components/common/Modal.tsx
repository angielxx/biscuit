import React from 'react';

// Component
import FeedBackButton from './FeedBackButton';

// twin macro
import tw, { styled, css } from 'twin.macro';

// icons
import Close from '../../assets/icons/close.svg';

// Styled component
const ModalContainer = styled.div`
  ${tw`bg-dark-evaluated p-4 pb-8 text-white rounded-20 flex flex-col gap-4`}
`;

const Tag = styled.div`
  ${tw`rounded-full text-tiny font-thin px-[10px] py-1 bg-dark-grey50 w-fit `}
`;

const Thumbnail = styled.div<{ image: string }>`
  ${tw`w-full aspect-w-16 aspect-h-9 bg-cover bg-center rounded-10`}
  ${({ image }) =>
    css`
      background-image: url(${image});
    `}
`;

const FeedbackContainer = styled.div`
  ${tw`flex flex-col gap-2`}
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
  ${tw`flex justify-center items-start py-4 gap-2`}
`;

interface Content {
  image: string;
}

interface ModalProps {
  closeModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
  content: Content;
}

// Main component
const Modal = ({ closeModal, content }: ModalProps) => {
  return (
    <ModalContainer>
      <div
        id="close-row"
        className="flex justify-end"
        onClick={(e) => closeModal(e)}
      >
        <img src={Close} alt="" />
      </div>
      <div id="content-area" className="flex flex-col gap-4">
        <h3 className="text-h3">방금 본 컨텐츠</h3>
        <div className="flex gap-2">
          <Tag>
            <span>태그 제목</span>
          </Tag>
          <Tag>
            <span>태그 제목</span>
          </Tag>
        </div>
        <Thumbnail
          image={`https://content.surfit.io/thumbs/image/5eQZ5/Wknoy/1126431375640856ffc9068.png/cover-center-1x.webp`}
        ></Thumbnail>
      </div>
      <hr className="bg-dark-grey-20" />
      <FeedbackContainer id="feedback">
        <h3>방금 본 컨텐츠가 어땠는지 알려주세요.</h3>
        <p>피드백을 주시면 더 정확한 컨텐츠를 받아보실 수 있어요.</p>
        <FeedbackBtns>
          <div>
            <FeedBackButton number="1" filled={true} />
            <span>쉽다</span>
          </div>
          <FeedBackButton number="2" filled={true} />
          <div>
            <FeedBackButton number="1" filled={true} />
            <span>보통이다</span>
          </div>
          <FeedBackButton number="4" filled={true} />
          <div>
            <FeedBackButton number="1" filled={true} />
            <span>어렵다</span>
          </div>
        </FeedbackBtns>
      </FeedbackContainer>
      <div id="quizes"></div>
    </ModalContainer>
  );
};

export default Modal;
