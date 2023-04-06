import { isNameState, isNoobState } from "../../recoils/Start/Atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { get_myInfo } from "../../api/myInfo";

const SocialLogin = () => {
  const navigate = useNavigate();
  const urlParams = new URL(location.href).searchParams;
  const isNoob = urlParams.get('is-noob');
  const nickname = urlParams.get('nickname');

  const [noob, setNoob] = useRecoilState(isNoobState);
  const [isName, setIsName] = useRecoilState(isNameState);

  console.log("login");
  console.log(isNoob);
  console.log(nickname);

  useEffect(() => {
    // 뉴비가 아니면
    if (isNoob === "false" && nickname !== "") {
      console.log("login 안됨");      
      navigate(`/`);
      setNoob(false);
      setIsName(nickname);
    } else {
      console.log("온보딩");
      // 뉴비이면
      navigate(`/onboarding`);
    }
  }, [])

  return (
    <></>
  )
}

export default SocialLogin;