import tw from "twin.macro";
import Contributions from "../components/Dashboard/Contributions";
import Graph from "../components/Dashboard/Graph";

const HomeContainer = tw.div`
  flex-col w-screen justify-center px-6 pt-4
`;


const MyInfoContainer = tw.div``;

const DashboardContainer = tw.div``;
const DashboardHeader = tw.div`flex-col w-[80%]`;

const Title = tw.p`text-white text-h2 mb-2`;
const Span = tw.p`text-dark-grey70 text-sub`;

const Point = tw.span``;

export default function MyPage() {
  return (
    <HomeContainer>
      <MyInfoContainer></MyInfoContainer>
      <DashboardContainer>
        <div>
          <DashboardHeader>
            <Title>대시보드</Title>
            <Span>컨텐츠를 보고 퀴즈를 풀면 잔디가 자라나요.</Span>
          </DashboardHeader>
          <div>
            <div></div>
            <Point></Point>
          </div>
        </div>
        <Contributions />
        <Span>님이 비스킷에서 가장 많이 본 콘텐츠에요.</Span>
        <Graph />
      </DashboardContainer>
    </HomeContainer>
  )
}
