import tw from "twin.macro";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Contributions from "../components/Dashboard/Contributions";
import Graph from "../components/Dashboard/Graph";
import Point from "../components/Dashboard/Point";
import MyInfos from "../components/Dashboard/MyInfos";
import { useQuery } from "@tanstack/react-query";
import { get_dashboard } from "../api/dashboard";
import { get_myInfo } from "../api/myInfo";
import { useRecoilValue } from "recoil";
import { functionToggleState } from "../recoils/FuntionToggle/Atoms";

const HomeContainer = tw.div`flex-col w-screen justify-center px-6 pt-4`;
const MyInfoContainer = tw.div`pb-6 mb-6 border-b-2 border-dark-grey20`;
const SettingContainer = tw.div`flex flex-col w-[25%] items-end justify-center`
const DashboardContainer = tw.div``;
const HeaderContainer = tw.div`flex flex-row mb-5`;
const DashboardHeader = tw.div`flex flex-col w-[75%]`;
const PointContainer = tw.div`flex flex-col w-[25%] justify-around items-end`
const Title = tw.p`text-white text-h2`;
const Span = tw.p`text-dark-grey70 text-sub`;
const Logo = tw.img`w-6 h-6`;

const Setting = ({ category }: { category: string }) => {
  const imgSrc = `src/assets/icons/${category}.svg`;
  const [isExists, setIsExists] = useState(false);
  function checkLocalImgFileExists(imgSrc: string) {
    let img = new Image();
    img.src = imgSrc;
    img.onload = function () {
      setIsExists(true);
    };
    img.onerror = function () {
      setIsExists(false);
    };
  }
  checkLocalImgFileExists(imgSrc);

  return isExists === true
    ? <Logo src={imgSrc} />
    : <Logo />;
};

type History = {
  date: string;
  count: number;
}

type GraphItem = {
  category: string;
  count: number;
}

interface DashboardContent {
  status: number;
  message: string;
  histories: History[];
  graphs: GraphItem[];
  point: number;
}

interface MyInfoContent {
  nickname: string,
  job: string,
	period: string,
  interest: string[],
}

export default function MyPage() {
  const functionToggle = useRecoilValue(functionToggleState);

  const navigate = useNavigate();
  const myInfoQuery = useQuery({
    queryKey: ['get_myInfo'],
    queryFn: () => get_myInfo(),
  }).data;

  const dashBoardQuery = useQuery({
    queryKey: ['get_dashboard'],
    queryFn: () => get_dashboard(),
  }).data;

  const [myInfoData, setMyInfoData] = useState<MyInfoContent>();
  const [dashBoardData, setDashBoardData] = useState<DashboardContent>();

  useEffect(() => {
    console.log(myInfoQuery);
    if (myInfoQuery !== undefined && myInfoQuery) {
      setMyInfoData(myInfoQuery);
    }
  }, [myInfoQuery]);

  useEffect(() => {
    console.log(dashBoardQuery);
    if (dashBoardData !== undefined && dashBoardQuery) {
      setDashBoardData(dashBoardQuery);
    }
  }, [dashBoardQuery]);

  return (
    <HomeContainer>
      <MyInfoContainer>
        <HeaderContainer>
          <DashboardHeader>
            {myInfoData && <Title>{myInfoData.nickname}님의 정보</Title>}
          </DashboardHeader>
          <SettingContainer onClick={() => navigate('/editProfile')}>
            <Setting category="setting"/>
          </SettingContainer>
        </HeaderContainer>
        {functionToggle.myInfoToggle && 
          myInfoData && <MyInfos myInfo={myInfoData}/>}
      </MyInfoContainer>
      <DashboardContainer>
        <HeaderContainer>
          <DashboardHeader>
            <Title>대시보드</Title>
            <Span>퀴즈를 풀면 잔디가 자라나요.</Span>
          </DashboardHeader>
          <PointContainer>
            {functionToggle.pointToggle && dashBoardData && <Point point={dashBoardData.point} />}
          </PointContainer>
        </HeaderContainer>
        {functionToggle.dashBoardToggle && dashBoardData && <Contributions histories={dashBoardData.histories} />}
        <Span>님이 비스킷에서 가장 많이 본 콘텐츠에요.</Span>
        {functionToggle.graphToggle && dashBoardData && <Graph graphs={dashBoardData.graphs}/>}
      </DashboardContainer>
    </HomeContainer>
  )
}
