import { getCookie, setCookie } from "typescript-cookie";
import { isNoobState } from "../../recoils/Start/Atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const urlParams = new URL(location.href).searchParams;
  const isNoob = urlParams.get('is-noob');

  const [noob, setNoob] = useRecoilState(isNoobState);

  // 뉴비가 아니면
  if (!isNoob) {
    navigate(`/`);
    setNoob(false);
  } else {
    // 뉴비이면
    navigate(`/onboarding`);
  }

  return (
    <></>
  )
}

export default GoogleLogin;