import tw from "twin.macro";
import Button from "../components/common/Button";
import EditInfo from "../components/Dashboard/EditInfo";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from "react";
import { put_myInfo } from "../api/editProfile";
import { useNavigate } from "react-router-dom";
import { get_myInfo } from "../api/myInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isNameState } from "../recoils/Start/Atoms";
import { homeFilterBtnState, homeFilterTimeState } from "../recoils/Home/Atoms";

const HomeContainer = tw.div`flex-col w-screen justify-center px-6 pt-4`;
const MyInfoContainer = tw.div`pb-6 mb-6`;
const SettingContainer = tw.div`flex flex-col w-[25%] items-end justify-center`
const HeaderContainer = tw.div`flex flex-row mb-5`;
const DashboardHeader = tw.div`flex flex-col w-[75%]`;
const Title = tw.p`text-white text-h2`;

interface MyInfoContent {
  nickname: string,
  job: string,
	period: number,
  interests: string[],
}

export default function EditProfile() {

  const myInfoQuery = useQuery({
    queryKey: ['get_myInfo'],
    queryFn: () => get_myInfo(),
  });
  
  const [myInfoData, setMyInfoData] = useState<MyInfoContent>();

  useEffect(() => {
    if (myInfoQuery !== undefined) {
      setMyInfoData(myInfoQuery.data);
    }
  }, [myInfoQuery]);

  const navigate = useNavigate();

  const [userData, setUserData] = useState<MyInfoContent>({
    nickname: "",
    period: 0,
    job: "",
    interests: [""],
  });

  // query 재요청 로직 추가 : 한별
  type filterItem = {
    id: number;
    content: string;
    status: boolean;
  };
  const queryClient = useQueryClient();
  const timeFilter = useRecoilValue(homeFilterTimeState);
  const [timeFilterIdx, setTimeFilterIdx] = useState(6);
  const typeFilter = useRecoilValue(homeFilterBtnState);

  useEffect(() => {
    let timeIdx: number = 6;
    timeFilter.forEach((time: filterItem) => {
      if (time.status === true) timeIdx = time.id;
    });
    setTimeFilterIdx(timeIdx);
  }, [timeFilter]);

  const { mutate: signOutMutate } = useMutation({
    mutationFn: () => put_myInfo(userData),
    onSuccess: async () => {
      // 추후 수정 예정
      await queryClient.invalidateQueries(['get_personal_contents', "bookmarked", timeFilterIdx, typeFilter]);
      await navigate('/mypage');
    },
  });

  const setIsNameState = useSetRecoilState(isNameState);
  const onSubmit = () => {
    setIsNameState(userData.nickname);
    signOutMutate();
  }

  useEffect(() => {
    if(myInfoData === undefined) return;
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
        {userData && userData.nickname !== "" && <EditInfo infoData={userData} setInfoData={setUserData}/>}
        <Button title="입력완료" status="active" onClick={() => onSubmit()} />
      </MyInfoContainer>
    </HomeContainer>
  )
}
