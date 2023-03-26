import Github from '../../assets/icons/Github.svg';
import Google from '../../assets/icons/Google.svg';

const Login = () => {
  const GithubLogin = () => {
    return ;
  }

  const GoogleLogin = () => {
    return ;
  }

  return (
    <>
    <div className='flex flex-col gap-9 mx-6 mt-6'>
      <div className="flex flex-col px-3 gap-4 justify-center items-center">
        <span className="text-h2">시작하기</span>
        <span className="text-main text-grey50">어떤 설명이나 인사 문구 한 줄</span>
      </div>
      <div className='flex flex-col py-2 px-1 gap-4'>
        <img src={Github} onClick={GithubLogin} />
        <img src={Google} onClick={GoogleLogin} />
      </div>
    </div>
    </>
  )
}

export default Login;