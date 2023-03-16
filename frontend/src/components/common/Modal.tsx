import React, { useState } from 'react';

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
  ${tw`w-full aspect-w-16 aspect-h-9 bg-cover bg-center rounded-10 relative cursor-pointer`}
  ${({ image }) =>
    css`
      background-image: url(${image});
    `}
`;

const BookmarkSvg = styled.svg`
  ${tw`fill-primary absolute right-6 top-0 h-10`}
`;

const ContentInfo = styled.div<{ image: string }>`
  ${tw`flex gap-2`}
  p {
    ${tw`text-main`}
  }
  span {
    ${tw`text-sub text-subColor`}
  }

  #channel {
    ${tw`bg-primary w-10 h-10 rounded-full min-w-[40px] min-h-[40px]`}
    ${({ image }) => css`
      background-image: url(${image});
    `}
  }
`;

const FeedbackContainer = styled.div`
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

const MarkBtnArea = styled.div<{ hidden: boolean }>`
  ${tw`cursor-pointer`}
  ${({ hidden }) => (hidden ? tw`hidden` : tw``)}
`;

// interface
interface Content {
  image: string;
  url: string;
  channelImg: string;
  title: string;
  author: string;
  date: string;
  isMarked: boolean;
  tags: Array<string>;
}

interface ModalProps {
  closeModal: React.MouseEvent<HTMLButtonElement>;
  content: Content;
}

// Main component
const Modal: React.FC<ModalProps> = ({ closeModal, content }) => {
  // 선택된 피드백 번호
  const [feedback, setFeedback] = useState(0);
  // 북마크 저장 여부, false는 임시
  const [isMarked, setIsMarked] = useState(false);
  // 북마크 버튼 숨김
  const [hideMark, setHideMark] = useState(true);
  // 페이지 번호 (1:피드백, 2:퀴즈)
  const [page, setPage] = useState(0);

  // 피드백 버튼 눌렀을 때
  const feedbackClickHandler = (num: number) => {
    setFeedback(num);
  };

  return (
    <ModalContainer>
      <div
        id="close-row"
        className="flex justify-end"
        // onClick={() => closeModal()}
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
        <div className="relative">
          <Thumbnail
            image={`https://content.surfit.io/thumbs/image/5eQZ5/Wknoy/1126431375640856ffc9068.png/cover-center-1x.webp`}
            onMouseEnter={() => setHideMark(false)}
            onMouseLeave={() => setHideMark(true)}
          ></Thumbnail>
          <MarkBtnArea
            hidden={hideMark ? true : false}
            onMouseEnter={() => setHideMark(false)}
            onMouseLeave={() => setHideMark(true)}
            onClick={() =>
              setIsMarked((prev) => {
                return !prev;
              })
            }
          >
            {isMarked ? (
              <BookmarkSvg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
              </BookmarkSvg>
            ) : (
              <BookmarkSvg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
              </BookmarkSvg>
            )}
          </MarkBtnArea>
        </div>
        <ContentInfo image="임시">
          <div id="channel"></div>
          <div id="text">
            <p>
              컨텐츠의 제목입니다.컨텐츠의 제목입니다.컨텐츠의
              제목입니다.컨텐츠의 제목입니다.
            </p>
            <span>작성자 | 작성일 </span>
          </div>
        </ContentInfo>
      </div>
      <hr className="bg-dark-grey-20" />
      {/* page가 0일 때 피드백 화면 */}
      {/* page가 0일 때 피드백 화면 */}
      {page === 0 && (
        <>
          <FeedbackContainer id="feedback">
            <h3>방금 본 컨텐츠가 어땠는지 알려주세요.</h3>
            <p>피드백을 주시면 더 정확한 컨텐츠를 받아보실 수 있어요.</p>
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
          </FeedbackContainer>
          <div id="submitBtn-page0" onClick={() => setPage(1)}></div>
        </>
      )}
      {/* page가 1일 때 퀴즈 화면 */}
      {page === 1 && (
        <>
          <div id="quizes"></div>
        </>
      )}
      {/* page가 2일 때 결과 화면 */}
      {page === 2 && <div id="result"></div>}
    </ModalContainer>
  );
};

export default Modal;
