import tw, { styled } from 'twin.macro';
import Github from '../../assets/icons/github.svg';
import Google from '../../assets/icons/google.svg';

const Container = styled.div`
  ${tw`w-[290px] flex flex-col gap-9 py-6`}
`

const Introduce = styled.div`
  ${tw`flex flex-col px-3 gap-4 justify-center items-center`}
`

const LoginContainer = styled.div`
  ${tw`flex flex-col py-2 px-1 gap-4 items-center`}
`

const LoginBox = styled.button`
  ${tw`w-[240px] h-17 flex justify-center items-center py-5 px-4 gap-4 rounded-12 shadow-[2px_2px_12px_rgba(0,0,0,0.2)]`}
`

const Start = () => {
  const GithubLogin = () => {
    // github 로그인 페이지 나오게 하기
  }

  const client_id = "1028867835633-rk5376oovhs02qvm3qgkg5oep0tb7l6c.apps.googleusercontent.com";
  const redirect_uri = "http://localhost:5173/login/oauth2/code/google";
  const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid";
  const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`;
  
  // 구글 로그인으로 이동 & 인가코드 받기
  const GoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  }

  return (
    <Container>
      <Introduce>
        <span className="text-h2">시작하기</span>
        <span className="text-main text-grey50">어떤 설명이나 인사 문구 한 줄</span>
      </Introduce>
      <LoginContainer>
        <LoginBox className='bg-dark-grey20' onClick={GithubLogin} >
          <img src={Github}/>
          <span>GitHub</span>
        </LoginBox>
        <LoginBox className='bg-white' onClick={GoogleLogin}>
          <img src={Google} />
          <span className='text-black'>Google</span>
        </LoginBox>
      </LoginContainer>
    </Container>
  )
}

export default Start;