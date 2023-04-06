// css
import tw from 'twin.macro';
import { useSetRecoilState } from 'recoil';
import { isNoobState } from '../../recoils/Start/Atoms';
import { useMutation } from '@tanstack/react-query';
import { post_signout } from '../../api/logout';

const Container = tw.div`absolute bottom-0 h-14 w-[calc(100% - 16px)] p-2 border-t border-solid border-dark-evaluated flex justify-end items-center`; 
const Btn = tw.button`w-6 h-5`
const Img = tw.img`w-full h-full`;

export default function Logout() {
  const setIsNoob = useSetRecoilState(isNoobState);

  const { mutate: signOutMutate } = useMutation({
    mutationFn: () => post_signout(),
    onSuccess: () => {
      document.cookie = "access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },
  });

  const onClick = () => {
    setIsNoob(true);
    signOutMutate();
  }

  return (
    <Container>
      <Btn onClick={() => onClick()}>
        <Img src="assets/icons/logout.svg" />
      </Btn>
    </Container>
  )
}
