import tw from "twin.macro";
import Button from "../components/common/Button";
import EditInfo from "../components/Dashboard/EditInfo";
import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from "react";

const HomeContainer = tw.div`flex-col w-screen justify-center px-6 pt-4`;
const MyInfoContainer = tw.div`pb-6 mb-6`;
const SettingContainer = tw.div`flex flex-col w-[25%] items-end justify-center`
const HeaderContainer = tw.div`flex flex-row mb-5`;
const DashboardHeader = tw.div`flex flex-col w-[75%]`;
const Title = tw.p`text-white text-h2`;

interface MyInfoContent {
  nickname: string,
  job: string,
	period: string,
  interests: string[],
}

export default function EditProfile() {
  const queryClient = useQueryClient();
  const myInfoData = queryClient.getQueryData<MyInfoContent>(['get_myInfo']);

  const [userData, setUserData] = useState({
    nickname: "",
    period: "",
    job: "",
    interests: [""],
  });

  useEffect(() => {
    if(myInfoData === undefined) return;
    console.log(myInfoData);
    setUserData(myInfoData);
  }, [myInfoData])

  return (
    <HomeContainer>
      <MyInfoContainer>
        <HeaderContainer>
          <DashboardHeader>
            <Title>회원정보 수정</Title>
          </DashboardHeader>
          <SettingContainer onClick={() => console.log("회원탈퇴 버튼")}>
          </SettingContainer>
        </HeaderContainer>
        {userData && <EditInfo infoData={userData} setInfoData={setUserData}/>}
        <Button title="입력완료" status="active" onClick={() => console.log("클릭")} />
      </MyInfoContainer>
    </HomeContainer>
  )
}
