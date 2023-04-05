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
      {content && <TextBox>{content}</TextBox>}
    </InfoContainer>
  )
}

type MyInfo = {
  nickname: string,
  job: string,
	period: string,
  interest: string[],
}

interface MyInfoContent {
  myInfo: MyInfo;
}

export default function MyInfos({myInfo}: MyInfoContent) {
  const functionToggle = useRecoilValue(functionToggleState);

  return (
    <>
      {functionToggle.jobToggle && <Info title="직무" content={myInfo?.job} />}
      {functionToggle.periodToggle && <Info title="경력" content={myInfo?.period} />}
      {functionToggle.interestToggle && <Info title="관심사" content={`${myInfo?.interest[0]}
        ${myInfo?.interest.length > 1
          ? `등 ${myInfo?.interest.length}개}` : ""}`}
      />}
    </>
  )
}
