import { useRef, useState } from "react";

import Modal from "../components/common/Modal/Modal";
import Nickname from "../components/OnBoarding/Nickname";
import AboutUser from "../components/OnBoarding/AboutUser";
import AboutInterest from "../components/OnBoarding/AboutInterest";

const OnBoarding = () => {
  const [userData, setUserData] = useState({
    nickname: "",
    period: "",
    job: "",
    interests: [""],
  });

  const isClose = () => {
    return ;
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
  const [isName, setIsName] = useState<string>("");
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
      setPage(1);
      console.log(isName);
    } else {
      return ;
    }
  }

  // 1. 직무, 연차 모달
  const [jobSelected, setJobSelected] = useState<string>("");
  const [periodSelected, setPeriodSelected] = useState<string>("");

  const aboutUser = () => {
    if (jobSelected !== "" && periodSelected !== "") {
      setUserData({...userData, job: jobSelected, period: periodSelected})
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

  const isSend = () => {
    setUserData({...userData, interests: selectList});

    // userData 백으로 전달

    console.log(userData);
    console.log(selectList);
  }

  return (
    <>
      {page === 0
        ? <Modal content={<Nickname isClicked={nickname} isChange={isChange} isName={isName} isCount={isCount} />} onClose={isClose} />
        : page === 1
          ? <Modal content={<AboutUser isClicked={aboutUser} jobSelected={jobSelected} setJobSelected={setJobSelected} periodSelected={periodSelected} setPeriodSelected={setPeriodSelected} isBack={isBack} />} onClose={isClose} />
          : page === 2
            ? <Modal content={<AboutInterest isClicked={isClicked} isSend={isSend} isBack={isBack} selectList={selectList} />} onClose={isClose} />
            : null
      }
    </>
  )
}

export default OnBoarding;