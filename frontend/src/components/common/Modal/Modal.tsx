import React, { ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';

// Component
import FeedBackButton from './FeedBackButton';
import Button from '../Button';

// twin macro
import tw, { styled, css, TwStyle } from 'twin.macro';

// icons
import Close from '../../assets/icons/close.svg';
import { JsxElement } from 'typescript';

// Styled component
const ModalContainer = styled.div`
  ${tw`absolute z-20 w-fit h-fit bg-dark-evaluated p-4 pb-8 text-white rounded-20 flex flex-col gap-4 mx-4`}
`;

const BackdropWrapper = styled.div`
  ${css`
    background: rgba(0, 0, 0, 0.75);
  `}
  ${tw`fixed top-0 left-0 w-full h-full z-auto`}
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
  content: ReactElement;
}

function Overlay({ content }: OverlayProps) {
  return <ModalContainer>{content}</ModalContainer>;
}

interface ModalProps {
  onClose?: () => void;
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
        <Overlay content={content} />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </React.Fragment>
  );
}

export default Modal;
