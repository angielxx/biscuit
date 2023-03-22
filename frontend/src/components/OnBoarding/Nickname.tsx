import Button from "../common/Button";
import TextInput from "./TextInput";

// icons
import hello from '../../assets/icons/hello.svg';
import tw, { styled } from "twin.macro";

const WelcomeBox = styled.div`
  ${tw`flex flex-col justify-center items-center py-4 gap-6 text-h2 text-white`}
`;

const NicknameBox = styled.div`
  ${tw`flex flex-col items-start px-2 gap-4 mb-4`}
`;

const Nickname = () => {
  const isClicked = () => {
    console.log("설정 완료");
  }

  return (
    <>
      <WelcomeBox>
        <img src={hello} />
        <span>비스킷에 오신 걸 환영합니다</span>
      </WelcomeBox>
      <hr className="my-4 border-[1px] border-dark-grey20" />
      <NicknameBox>
        <span className="text-h3 text-white">닉네임을 설정해주세요.</span>
        <TextInput status="primary" />
      </NicknameBox>
      <div className="flex justify-center px-2 gap-2">
        <Button title="설정 완료" status="active" onClick={isClicked} />   
      </div>
    </>
  );
};

export default Nickname;