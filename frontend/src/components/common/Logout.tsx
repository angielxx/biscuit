// css
import tw, { styled, css } from 'twin.macro';

import { useNavigate } from 'react-router-dom';
import { isNoobState } from '../../recoils/Start/Atoms';
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { post_signout } from '../../api/logout';
import { removeCookie } from 'typescript-cookie';
import Close from '../../assets/icons/close.svg'

const SelectBtn = styled.button`
  ${tw`h-9 w-15 flex items-center justify-center py-3 px-2 border-[1px] border-dark-primary rounded-[10px] text-tiny`}
`
const ModalContainer = styled.div((props: { isOnboarding: boolean }) => [
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
    ? css`
        overflow: scroll;
      `
    : null,
]);

const ModalContentContainer = styled.div`
  ${tw`overflow-scroll relative h-full`}
`;

const BackdropWrapper = styled.div`
  ${css`
    background: rgba(0, 0, 0, 0.75);
  `}
  ${tw`fixed top-0 left-0 w-full h-full z-20`}
`;

interface BackdropProps {
  onClose?: () => void;
}

function Backdrop({ onClose }: BackdropProps) {
  return <BackdropWrapper onClick={onClose} />;
}

interface LogoutProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutBox = ({ setIsOpen, setIsLogout }: LogoutProps) => {
  const setIsNoob = useSetRecoilState(isNoobState);
  const navigate = useNavigate();

  const { mutate: signOutMutate } = useMutation({
    mutationFn: () => post_signout(),
    onSuccess: () => {
      // document.cookie = "access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      // document.cookie = "refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      removeCookie('access-token', { path: '/', domain: 'https://j8a706.p.ssafy.io/' });
      removeCookie('refresh-token', { path: '/', domain: 'https://j8a706.p.ssafy.io/' });
    },
  });

  const onClick = () => {
    setIsNoob(true);
    signOutMutate();
    navigate(`/`);
    setIsOpen(false);
  }

  return (
    <>
      <Backdrop onClose={() => setIsLogout(false)} />

      <ModalContainer isOnboarding={false}>
        <div id="close-row" className="flex justify-end">
          <img src={Close} alt="모달 닫는 버튼" onClick={() => setIsLogout(false)} />
        </div>
        <ModalContentContainer>
          <div className='flex flex-col justify-center items-center gap-4 mb-2'>
            <span>로그아웃 하시겠습니까?</span>
            <div className='flex gap-4'>
              <SelectBtn onClick={onClick}>네</SelectBtn>
              <SelectBtn onClick={() => setIsLogout(false)}>아니오</SelectBtn>
            </div>
          </div>
        </ModalContentContainer>
      </ModalContainer>
    </>
  )
};

export default LogoutBox;
