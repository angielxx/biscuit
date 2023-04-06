import React, { ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';

// Component
import FeedBackButton from './FeedBackButton';
import Button from '../Button';

// twin macro
import tw, { styled, css, TwStyle } from 'twin.macro';

// icons
import Close from '../../../assets/icons/close.svg';
import { JsxElement } from 'typescript';

// Styled component
const ModalContainer = styled.div((props: {isOnboarding: boolean}) => [
  tw`fixed z-50 bg-dark-evaluated p-6 text-white rounded-20`,
  tw`w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw] 2xl:w-[40vw]`,
  css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 80vh;
    max-width: 90vw;
    min-width: 300px;

    @media (min-width: 640px) {
      min-width: 80vw;
    }

    @media (min-width: 768px) {
      min-width: 60vw;
    }

    @media (min-width: 1024px) {
      min-width: 50vw;
    }

    @media (min-width: 1280px) {
      min-width: 40vw;
    }
  `,
  props.isOnboarding === false
    ? css`overflow: scroll;`
    : null
])

const ModalContentContainer = styled.div`
  ${tw`overflow-scroll relative h-full`}
`;

const BackdropWrapper = styled.div`
  ${css`
    background: rgba(0, 0, 0, 0.75);
  `}
  ${tw`fixed top-0 left-0 w-full h-full z-50`}
`;

// Backdrop : 뒷배경
interface BackdropProps {
  onClose?: () => void;
}

function Backdrop({ onClose }: BackdropProps) {
  return <BackdropWrapper onClick={onClose} />;
}

// Overlay : 모달 창
interface OverlayProps {
  onClose: () => void;
  content: ReactElement;
  isOnboarding: boolean;
}

function Overlay({ onClose, content, isOnboarding }: OverlayProps) {
  return (
    <ModalContainer isOnboarding={isOnboarding}>
      {!isOnboarding
        ?
          <div id="close-row" className="flex justify-end">
            <img src={Close} alt="모달 닫는 버튼" onClick={onClose} />
          </div>
        : null
      }
      <ModalContentContainer>{content}</ModalContentContainer>
    </ModalContainer>
  );
}

interface ModalProps {
  onClose: () => void;
  content: ReactElement;
  isOnboarding: boolean;
}

function Modal({ onClose, content, isOnboarding }: ModalProps) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <Overlay content={content} onClose={onClose} isOnboarding={isOnboarding} />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </React.Fragment>
  );
}

export default Modal;
