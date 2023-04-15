import tw from 'twin.macro';
import Button from '../common/Button';
import Modal from '../common/Modal/Modal';
import AboutInterest from '../OnBoarding/AboutInterest';
import React, { useState, useEffect } from 'react';
import DropDown from '../common/DropDown/DropDown';
import { useRecoilValue } from 'recoil';
import { functionToggleState } from '../../recoils/FuntionToggle/Atoms';

const InfoContainer = tw.div`w-full h-fit justify-between flex flex-row my-4`;
const TitleContainer = tw.div`flex w-[20%] h-14 items-center`;
const Span = tw.p`text-white text-main`;
const TextBox = tw.input`w-[80%] h-14 p-4 bg-grey20 rounded-10 text-main text-primary`;
const BtnContainer = tw.div`w-[80%] h-14 pt-1`;
const DropDownContainer = tw.div`w-[80%] h-14`;

interface InfoProps {
  title: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

interface InterestProps {
  title: string;
  selectList: string[];
  setSelectList: React.Dispatch<React.SetStateAction<string[]>>;
}

type MyInfoContent = {
  nickname: string;
  job: string;
  period: number;
  interests: string[];
};

interface MyInfoProps {
  infoData: MyInfoContent;
  setInfoData: React.Dispatch<React.SetStateAction<MyInfoContent>>;
}

const Info = ({ title, content, setContent }: InfoProps) => {
  return (
    <InfoContainer>
      <TitleContainer>
        <Span>{title}</Span>
      </TitleContainer>
      <TextBox value={content} onChange={(e) => setContent(e.target.value)} />
    </InfoContainer>
  );
};

const Interest = ({ title, selectList, setSelectList }: InterestProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const isClose = () => {
    return setModalOpen(false);
  };

  const isBack = () => {
    return setModalOpen(false);
  };

  const isClicked = (event: any, item: string) => {
    event.stopPropagation();

    if (selectList.includes(item)) {
      const newArr = selectList.filter((element) => element !== item);
      setSelectList(newArr);
    } else {
      setSelectList([...selectList, item]);
    }
  };

  const isSend = () => {
    return setModalOpen(false);
  };

  return (
    <InfoContainer>
      <TitleContainer>
        <Span>{title}</Span>
      </TitleContainer>
      <BtnContainer>
        <Button
          title="관심사 설정하기"
          status="disabled"
          onClick={() => {
            setModalOpen(true);
          }}
        />
      </BtnContainer>
      {modalOpen && selectList && (
        <Modal
          content={
            <AboutInterest
              isClicked={isClicked}
              isSend={isSend}
              isBack={isBack}
              selectList={selectList}
            />
          }
          onClose={isClose}
          isOnboarding={true}
        />
      )}
    </InfoContainer>
  );
};

export default function EditInfo({ infoData, setInfoData }: MyInfoProps) {
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

  const yearToStr = [
    '1년 미만',
    '1년차',
    '2년차',
    '3년차',
    '4년차',
    '5년차',
    '6년차',
    '7년차',
    '8년차',
    '9년차',
    '10년 이상',
  ];

  const [nickname, setNickName] = useState<string>('');
  const [jobSelected, setJobSelected] = useState<string>('');
  const [periodSelected, setPeriodSelected] = useState<string>('');
  const [selectList, setSelectList] = useState<string[]>([]);

  useEffect(() => {
    setNickName(infoData.nickname);
    setJobSelected(infoData.job);
    setPeriodSelected(yearToStr[infoData.period]);
    setSelectList([...infoData.interests]);
  }, []);

  useEffect(() => {
    if (
      nickname === undefined ||
      jobSelected === undefined ||
      periodSelected === undefined ||
      selectList === undefined
    )
      return;
    if (
      nickname === '' ||
      jobSelected === '' ||
      periodSelected === '' ||
      selectList.length === 0
    )
      return;

    const tmp = { ...infoData };
    tmp.nickname = nickname;
    tmp.job = jobSelected;
    tmp.period = yearToStr.indexOf(periodSelected);
    tmp.interests = [...selectList];
    setInfoData({ ...tmp });
  }, [jobSelected, periodSelected, nickname, selectList]);

  const functionToggle = useRecoilValue(functionToggleState);

  return (
    <>
      {functionToggle.editNickname && nickname !== undefined && (
        <Info title="닉네임" content={nickname} setContent={setNickName} />
      )}

      <InfoContainer>
        <TitleContainer>
          <Span>직무</Span>
        </TitleContainer>
        <DropDownContainer>
          {functionToggle.editJob && jobSelected && (
            <DropDown
              itemList={jobList}
              placeHolder="직무 선택"
              selected={jobSelected}
              setSelected={setJobSelected}
              isOnboarding={false}
            />
          )}
        </DropDownContainer>
      </InfoContainer>

      <InfoContainer>
        <TitleContainer>
          <Span>경력</Span>
        </TitleContainer>
        <DropDownContainer>
          {functionToggle.editPeriod && periodSelected && (
            <DropDown
              itemList={yearsList}
              placeHolder="연차 선택"
              selected={periodSelected}
              setSelected={setPeriodSelected}
              isOnboarding={false}
            />
          )}
        </DropDownContainer>
      </InfoContainer>

      {functionToggle.editInterest && (
        <Interest
          title="관심사"
          selectList={selectList}
          setSelectList={setSelectList}
        />
      )}
    </>
  );
}
