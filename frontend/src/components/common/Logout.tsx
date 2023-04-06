// css
import tw, { styled } from 'twin.macro';

import { useNavigate } from 'react-router-dom';
import { isNoobState } from '../../recoils/Start/Atoms';
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { post_signout } from '../../api/logout';
import { removeCookie } from 'typescript-cookie';

const SelectBtn = styled.button`
  ${tw`h-9 w-15 flex items-center justify-center py-3 px-2 border-[1px] border-dark-primary rounded-[10px] text-tiny`}
`

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
    <div className='flex flex-col w-full justify-center items-center gap-4 mb-2'>
      <span>로그아웃 하시겠습니까?</span>
      <div className='flex gap-4'>
        <SelectBtn onClick={onClick}>네</SelectBtn>
        <SelectBtn onClick={() => setIsLogout(false)}>아니오</SelectBtn>
      </div>
    </div>
  )
};

export default LogoutBox;
