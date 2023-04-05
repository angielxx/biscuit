import tw from "twin.macro";
import Button from "../common/Button";
import Modal from "../common/Modal/Modal";
import AboutInterest from "../OnBoarding/AboutInterest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { post_about_user } from "../../api/login";
import DropDown from "../common/DropDown/DropDown";

const InfoContainer = tw.div`w-full h-fit justify-between flex flex-row my-4`;
const TitleContainer = tw.div`flex w-[20%] h-14 items-center`;
const Span = tw.p`text-white text-main`;
const TextBox = tw.input`w-[80%] h-14 p-4 bg-dark-grey20 rounded-10 text-main text-primary`;
const BtnContainer = tw.div`w-[80%] h-14 pt-1`;
const DropDownContainer = tw.div`w-[80%] h-14`;

interface InfoProps {
  title: string;
  content: string;
}

interface InterestProps {
  title: string;
}

const Info = ({title, content}: InfoProps) => {
  return (
    <InfoContainer>
      <TitleContainer>
        <Span>{title}</Span>
      </TitleContainer>
      <TextBox value={content}/>
    </InfoContainer>
  )
}

const Interest = ({title}: InterestProps) => {
  // api로 받아오기
  const [selectList, setSelectList] = useState<string[]>([]);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    nickname: "",
    period: "",
    job: "",
    interests: [""],
  });
  
  const isClose = () => {
    return setModalOpen(false);
  }

  const isBack = () => {
    return setModalOpen(false);
  }
  
  const isClicked = (event: any, item: string) => {
    event.stopPropagation();

    if (selectList.includes(item)) {
      const newArr = selectList.filter((element) => element !== item);
      setSelectList(newArr);
    } else {
      setSelectList([...selectList, item]);
    }
  }

  // userData 전달
  const { mutate: userDataPost } = useMutation({
    mutationFn: (userData: {}) => post_about_user(userData),
  });

  const isSend = () => {
    setUserData({...userData, interests: selectList});
    userDataPost(userData);
    console.log(selectList);

    // 홈으로 이동
    navigate(`/mypage`);
  }

  return (
    <InfoContainer>
      <TitleContainer>
        <Span>{title}</Span>
      </TitleContainer>
      <BtnContainer>
        <Button title="관심사 설정하기" status="disabled" onClick={() => {setModalOpen(true)}} />
      </BtnContainer>
      {modalOpen && <Modal content={<AboutInterest isClicked={isClicked} isSend={isSend} isBack={isBack} selectList={selectList} />} onClose={isClose} isOnboarding={false} />}
    </InfoContainer>
  )
}

export default function EditInfo() {

  const jobList = [
    { id: 0, content: "Frontend" },
    { id: 1, content: "Backend" },
    { id: 2, content: "DevOps" },
  ]

  const yearsList = [
    { id: 0, content: "1년 미만" },
    { id: 1, content: "1년차" },
    { id: 2, content: "2년차" },
    { id: 3, content: "3년차" },
    { id: 4, content: "4년차" },
    { id: 5, content: "5년차" },
    { id: 6, content: "6년차" },
    { id: 7, content: "7년차" },
    { id: 8, content: "8년차" },
    { id: 9, content: "9년차" },
    { id: 10, content: "10년 이상" },
  ]
  
  // 얘도 api랑 연결해서 받아오기
  const [jobSelected, setJobSelected] = useState<string>("");
  const [periodSelected, setPeriodSelected] = useState<string>("");
  
  return (
    <>
      <Info title="닉네임" content="탐정 제 이름은 코난이죠" />
      
    <InfoContainer>
      <TitleContainer>
        <Span>직무</Span>
      </TitleContainer>
      <DropDownContainer>
        <DropDown
          itemList={jobList} 
          placeHolder="직무 선택" 
          selected={jobSelected}
          setSelected={setJobSelected}
          isOnboarding={false}
        />
      </DropDownContainer>
    </InfoContainer>
    
    <InfoContainer>
      <TitleContainer>
        <Span>직무</Span>
      </TitleContainer>
      <DropDownContainer>
        <DropDown 
          itemList={yearsList} 
          placeHolder="연차 선택"
          selected={periodSelected}
          setSelected={setPeriodSelected}
          isOnboarding={false}
        />
      </DropDownContainer>
    </InfoContainer>

      <Interest title="관심사"/>
    </>
  )
}
