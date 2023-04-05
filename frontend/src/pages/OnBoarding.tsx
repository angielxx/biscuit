import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import Modal from "../components/common/Modal/Modal";
import Nickname from "../components/OnBoarding/Nickname";
import AboutUser from "../components/OnBoarding/AboutUser";
import AboutInterest from "../components/OnBoarding/AboutInterest";
import { post_about_user } from "../api/login";

import { isNameState, isNoobState } from "../recoils/Start/Atoms";

const OnBoarding = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nickname: "",
    period: 0,
    job: "",
    interests: [""],
  });

  const isClose = () => {
    return alert("온보딩을 완료하셔야 비스킷을 시작할 수 있어요!");
  }

  const [page, setPage] = useState<number>(0);
  const isBack = () => {
    if (page === 1) {
      setPage(0);
    } else {
      setPage(1);
    }
  }

  // 0. 닉네임 모달
  const [isName, setIsName] = useRecoilState(isNameState);
  const [isCount, setIsCount] = useState<number>(0);

  const isChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setIsName(value.trim());
    setIsCount(e.target.value.replace(/<br\s*\/?>/gm, "\n").length);
  }

  const nickname = () => {
    if (isName !== "") {
      setUserData({...userData, nickname: isName});
      // 유저 닉네임 저장
      localStorage.setItem("nickname", isName);
      setPage(1);
      console.log(isName);
    } else {
      return ;
    }
  }

  // 1. 직무, 연차 모달
  const [jobSelected, setJobSelected] = useState<string>("");
  const [periodSelected, setPeriodSelected] = useState<string>("");

  type YearsListType = {
    [index: string]: number;
    "1년 미만": number;
    "1년차": number;
    "2년차": number;
    "3년차": number;
    "4년차": number;
    "5년차": number;
    "6년차": number;
    "7년차": number;
    "8년차": number;
    "9년차": number;
    "10년 이상": number;
  }
  
  const yearsList: YearsListType = {
    "1년 미만": 0,
    "1년차": 1, 
    "2년차": 2, 
    "3년차": 3,
    "4년차": 4,
    "5년차": 5, 
    "6년차": 6, 
    "7년차": 7,
    "8년차": 8,
    "9년차": 9,
    "10년 이상": 10,
  }

  const aboutUser = () => {
    if (jobSelected !== "" && periodSelected !== "") {
      setUserData({...userData, job: jobSelected, period: yearsList[periodSelected]})
      setPage(2);
      console.log(jobSelected, periodSelected);
    } else {
      return ;
    }
  }

  // 2. 닉네임, 직무/연차, 관심사 JSON 전달
  const [selectList, setSelectList] = useState<string[]>([]);

  const isClicked = (event: any, item: string) => {
    event.stopPropagation();

    if (selectList.includes(item)) {
      const newArr = selectList.filter((element) => element !== item);
      setSelectList(newArr);
    } else {
      setSelectList([...selectList, item]);
    }

  }
  
  const [noob, setNoob] = useRecoilState(isNoobState);
  
  // userData 전달
  const { mutate: userDataPost } = useMutation({
    mutationFn: (userData: {}) => post_about_user(userData),
  });

  useEffect(() => {
    setUserData({...userData, interests: selectList});
  }, [selectList]);
  
  const isSend = () => {
    console.log(selectList);
    userDataPost(userData);
    setNoob(false);

    // 홈으로 이동
    navigate(`/`);
  }

  return (
    <>
      {page === 0
        ? <Modal content={<Nickname isClicked={nickname} isChange={isChange} isName={isName} isCount={isCount} />} onClose={isClose} isOnboarding={true} />
        : page === 1
          ? <Modal content={<AboutUser isClicked={aboutUser} jobSelected={jobSelected} setJobSelected={setJobSelected} periodSelected={periodSelected} setPeriodSelected={setPeriodSelected} isBack={isBack} />} onClose={isClose} isOnboarding={true} />
          : page === 2
            ? <Modal content={<AboutInterest isClicked={isClicked} isSend={isSend} isBack={isBack} selectList={selectList} />} onClose={isClose} isOnboarding={true} />
            : null
      }
    </>
  )
}

export default OnBoarding;