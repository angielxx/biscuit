import { useRecoilValue } from "recoil";
import tw from "twin.macro";
import { functionToggleState } from "../../recoils/FuntionToggle/Atoms";

const InfoContainer = tw.div`w-full h-fit justify-between flex flex-row my-4`;
const TitleContainer = tw.div`flex w-[20%] h-14 items-center`;
const Span = tw.p`text-white text-main`;
const TextBox = tw.div`w-[80%] h-14 p-4 bg-dark-grey20 rounded-10 text-main text-primary`;

interface InfoProps {
  title: string;
  content: string;
}

const Info = ({title, content}: InfoProps) => {
  return (
    <InfoContainer>
      <TitleContainer>
        {title && <Span>{title}</Span>}
      </TitleContainer>
      {content!==undefined && <TextBox>{content}</TextBox>}
    </InfoContainer>
  )
}

type MyInfo = {
  nickname: string,
  job: string,
	period: number,
  interests: string[],
}

interface MyInfoContent {
  myInfo: MyInfo;
}

export default function MyInfos({myInfo}: MyInfoContent) {
  const functionToggle = useRecoilValue(functionToggleState);
  const yearsList= [
    "1년 미만",
    "1년차",
    "2년차",
    "3년차",
    "4년차",
    "5년차",
    "6년차",
    "7년차",
    "8년차",
    "9년차",
    "10년 이상",
  ]

  return (
    <>
      {functionToggle.jobToggle && <Info title="직무" content={myInfo?.job} />}
      {functionToggle.periodToggle && <Info title="경력" content={yearsList[myInfo?.period]} />}
      {functionToggle.interestToggle
        && myInfo !==undefined
        && myInfo.interests !== undefined
        && <Info title="관심사" content={`${myInfo?.interests[0]}
        ${myInfo?.interests.length > 1
          ? `등 ${myInfo?.interests.length}개` : ""}`}
      />}
    </>
  )
}
