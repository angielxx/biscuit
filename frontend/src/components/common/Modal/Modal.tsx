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
const ModalContainer = styled.div`
  ${tw`fixed z-50 bg-dark-evaluated p-6 text-white rounded-20`}
  ${css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 90vh;
    min-height: 90vh;
    max-width: 85vw;
  `}
`;

const ModalContentContainer = styled.div`
  ${tw`overflow-scroll`}
  ${css`
    height: calc(100% - 72px);
    max-height: calc(90vh - 72px);
    min-height: calc(90vh - 72px);
  `}
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
}

function Overlay({ onClose, content }: OverlayProps) {
  return (
    <ModalContainer>
      <div id="close-row" className="flex justify-end">
        <img src={Close} alt="모달 닫는 버튼" onClick={onClose} />
      </div>
      <ModalContentContainer>{content}</ModalContentContainer>
    </ModalContainer>
  );
}

interface ModalProps {
  onClose: () => void;
  content: ReactElement;
}

function Modal({ onClose, content }: ModalProps) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <Overlay content={content} onClose={onClose} />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </React.Fragment>
  );
}

export default Modal;
