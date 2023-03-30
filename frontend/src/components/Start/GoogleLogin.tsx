const GoogleLogin = () => {
  const urlParams = new URL(location.href).searchParams;
  const authorizationCode = urlParams.get('code');

  console.log(authorizationCode);
  // 백엔드로 인가 코드 보내기

  return (
    <></>
  )
}

export default GoogleLogin;