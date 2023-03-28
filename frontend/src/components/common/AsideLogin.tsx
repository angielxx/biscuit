import tw, { styled } from 'twin.macro';

import biscuit from '../../assets/icons/biscuit.svg';

const LoginBox = styled.div`
  ${tw`flex flex-col justify-end items-start p-4 gap-5 self-stretch`}
`;

const Login = styled.div`
  ${tw`w-[266px] h-14 flex justify-center items-center p-4 gap-2 bg-dark-evaluated rounded-[77px]`}
`

interface AsideLoginProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const AsideLogin = ({ onClick }: AsideLoginProps) => {
  return (
    <LoginBox>
      <img src={biscuit} />
      <Login onClick={onClick}>
        <span className='text-white'>로그인</span>
      </Login>
    </LoginBox>
  )
}

export default AsideLogin;