import tw from "twin.macro";
import { useState } from 'react';
import Contributions from "../components/Dashboard/Contributions";
import Graph from "../components/Dashboard/Graph";
import Point from "../components/Dashboard/Point";
import MyInfos from "../components/Dashboard/MyInfos";

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


export default function MyPage() {
  return (
    <HomeContainer>
      <MyInfoContainer>
        <HeaderContainer>
          <DashboardHeader>
            <Title>비스킷님의 정보</Title>
            {/* <Span>사용자 정보에 맞는 컨텐츠를 제공해드려요.</Span> */}
          </DashboardHeader>
          <SettingContainer onClick={() => console.log("클릭")}>
            <Setting category="setting"/>
          </SettingContainer>
        </HeaderContainer>
        <MyInfos />
      </MyInfoContainer>
      <DashboardContainer>
        <HeaderContainer>
          <DashboardHeader>
            <Title>대시보드</Title>
            <Span>퀴즈를 풀면 잔디가 자라나요.</Span>
          </DashboardHeader>
          <PointContainer>
            <Point point={100} />
          </PointContainer>
        </HeaderContainer>
        <Contributions />
        <Span>님이 비스킷에서 가장 많이 본 콘텐츠에요.</Span>
        <Graph />
      </DashboardContainer>
    </HomeContainer>
  )
}
