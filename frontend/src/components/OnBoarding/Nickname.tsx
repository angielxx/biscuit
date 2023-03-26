import { useState } from 'react';

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
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const isClicked = () => {
    console.log("설정 완료");
    // DB에 중복되는 닉네임이 있으면 setIsCheck(false);

    // DB에 중복되는 닉네임이 없으면 setIsCheck(true);
    // 상태 저장하고 AboutUser 컴포넌트로 이동
  }

  const [isName, setIsName] = useState<string>("");
  const [isCount, setIsCount] = useState<number>(0);

  const isChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setIsName(value);
    setIsCount(e.target.value.replace(/<br\s*\/?>/gm, "\n").length);
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
        <TextInput status={isName === "" ? "primary" : isCheck ? "success" : "error"} onChange={isChange} isCount={isCount} />
      </NicknameBox>
      <div className="flex justify-center px-2 gap-2">
        <Button title="설정 완료" status={isName !== "" ? "active" : "disabled"} onClick={isClicked} />   
      </div>
    </>
  );
};

export default Nickname;