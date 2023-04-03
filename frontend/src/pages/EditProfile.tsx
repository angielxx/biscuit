import tw from "twin.macro";
import Button from "../components/common/Button";
import EditInfo from "../components/Dashboard/EditInfo";

const HomeContainer = tw.div`flex-col w-screen justify-center px-6 pt-4`;
const MyInfoContainer = tw.div`pb-6 mb-6`;
const SettingContainer = tw.div`flex flex-col w-[25%] items-end justify-center`
const DashboardContainer = tw.div``;
const HeaderContainer = tw.div`flex flex-row mb-5`;
const DashboardHeader = tw.div`flex flex-col w-[75%]`;
const PointContainer = tw.div`flex flex-col w-[25%] justify-around items-end`
const Title = tw.p`text-white text-h2`;
const Span = tw.p`text-dark-grey70 text-sub`;
const Logo = tw.img`w-6 h-6`;

export default function EditProfile() {
  return (
    <HomeContainer>
      <MyInfoContainer>
        <HeaderContainer>
          <DashboardHeader>
            <Title>회원정보 수정</Title>
          </DashboardHeader>
          <SettingContainer onClick={() => console.log("클릭")}>
          </SettingContainer>
        </HeaderContainer>
        <EditInfo />
        <Button title="입력완료" status="active" onClick={() => console.log("클릭")} />
      </MyInfoContainer>
    </HomeContainer>
  )
}
