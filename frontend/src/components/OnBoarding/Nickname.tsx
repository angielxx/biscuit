import { useState } from 'react';

import Button from '../common/Button';
import TextInput from './TextInput';

// icons
import hello from '../../assets/icons/hello.png';
import tw, { styled } from 'twin.macro';

const WelcomeBox = styled.div`
  ${tw`flex flex-col justify-center items-center py-3 gap-6 text-h2 text-white`}
`;

const NicknameBox = styled.div`
  ${tw`flex flex-col items-start px-2 gap-4 mb-4`}
`;

interface NicknameProps {
  isClicked: () => void;
  isChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isName: string;
  isCount: number;
}

const Nickname = ({ isClicked, isChange, isName, isCount }: NicknameProps) => {
  return (
    <>
      <WelcomeBox>
        <img src={hello} className="w-20 h-20" />
        <span className='text-h3'>비스킷에 오신 걸 환영합니다</span>
      </WelcomeBox>
      <hr className="my-4 border-[1px] border-dark-grey20" />
      <NicknameBox>
        <span className="text-h4 text-white">닉네임을 설정해주세요.</span>
        <TextInput
          status={isName === '' ? 'primary' : 'success'}
          onChange={isChange}
          isCount={isCount}
          value={isName}
        />
      </NicknameBox>
      <div className="flex justify-center px-2 gap-2 mb-4">
        <Button
          title="설정 완료"
          status={isName !== '' ? 'active' : 'disabled'}
          onClick={isClicked}
        />
      </div>
    </>
  );
};

export default Nickname;
