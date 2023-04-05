import { useState } from 'react';
import DropDown from '../common/DropDown/DropDown';
import Button from '../common/Button';

// icons
import backspace from '../../assets/icons/backspace.svg';

// css
import tw, { styled } from 'twin.macro';

const ChooseContent = styled.div`
  ${tw`flex flex-col gap-4 mb-4`}
`;

const ChooseItem = styled.div`
  ${tw`flex flex-col p-2 gap-4`}
`;

interface AboutUserProps {
  isClicked: () => void;
  jobSelected: string;
  setJobSelected: React.Dispatch<React.SetStateAction<string>>;
  periodSelected: string;
  setPeriodSelected: React.Dispatch<React.SetStateAction<string>>;
  isBack: () => void;
}

const AboutUser = ({
  isClicked,
  jobSelected,
  setJobSelected,
  periodSelected,
  setPeriodSelected,
  isBack,
}: AboutUserProps) => {
  const jobList = [
    { id: 0, content: 'Frontend' },
    { id: 1, content: 'Backend' },
    { id: 2, content: 'DevOps' },
  ];

  const yearsList = [
    { id: 0, content: '1년 미만' },
    { id: 1, content: '1년차' },
    { id: 2, content: '2년차' },
    { id: 3, content: '3년차' },
    { id: 4, content: '4년차' },
    { id: 5, content: '5년차' },
    { id: 6, content: '6년차' },
    { id: 7, content: '7년차' },
    { id: 8, content: '8년차' },
    { id: 9, content: '9년차' },
    { id: 10, content: '10년 이상' },
  ];

  return (
    <>
      <div className="flex items-start">
        <img src={backspace} onClick={isBack} />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <span className="text-h3">OO님에 대해 알고 싶어요!</span>
        <span className="text-sub text-subColor">직무와 경력에 맞는 컨텐츠를 추천드려요</span>
      </div>
      <hr className="my-4 border-[1px] border-dark-grey20" />
      <ChooseContent>
        <ChooseItem>
          <span className="text-h4">어떤 직무의 개발자신가요?</span>
          <DropDown
            itemList={jobList}
            placeHolder="직무 선택"
            selected={jobSelected}
            setSelected={setJobSelected}
            isOnboarding={true}
          />
        </ChooseItem>
        <ChooseItem>
          <span className="text-h4">개발자로 일한지 얼마나 되셨나요?</span>
          <DropDown
            itemList={yearsList}
            placeHolder="연차 선택"
            selected={periodSelected}
            setSelected={setPeriodSelected}
            isOnboarding={true}
          />
        </ChooseItem>
      </ChooseContent>
      <div className="flex justify-center px-2 gap-2 mb-4">
        <Button
          title="선택 완료"
          status={
            jobSelected !== '' && periodSelected !== '' ? 'active' : 'disabled'
          }
          onClick={isClicked}
        />
      </div>
    </>
  );
};

export default AboutUser;
