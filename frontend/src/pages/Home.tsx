import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from '../components/common/Button';
import ContentCardItem from '../components/common/ContentCardItem';
import DropDown from '../components/common/DropDown/DropDown';
import FilterBar from '../components/common/FilterBar/FilterBar';
import Modal from '../components/common/Modal';
import { functionToggleState } from '../recoils/FuntionToggle/Atoms';
import { homeFilterBtnState, homeFilterTimeState } from '../recoils/Home/Atoms';

export default function Home() {
  const functionToggle = useRecoilValue(functionToggleState);

  const clickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('클릭!');
  };

  // 피드백 모달 표시 여부
  const [showFeedbackModal, setShowFeedbackModal] = useState(true);
  // 유저가 가장 최근에 본 콘텐츠 정보
  const [recentContent, setRecentContent] = useState({});

  // 더미 데이터
  const dummy_content = {
    id: 0,
    title: '토스 디자인 원칙 Value first, Cost later',
    url: 'https://toss.tech/article/value-first-cost-later',
    credit_by: '이혜인',
    created_date: '2023.03.20',
    time_cost: 0,
    type: '',
    isMarked: false,
    tags: [],
    channelImg: '',
    thumbnailImg: '',
  };

  const closeModal = () => {
    console.log('clicked');
    setShowFeedbackModal(false);
  };

  const dropDownList = [
    { id: 1, content: 'Frontend' },
    { id: 2, content: 'Backend' },
    { id: 3, content: 'DevOps' },
  ];

  const [filterBtnState, setFilterBtnState] =
    useRecoilState(homeFilterBtnState);
  const [filterTimeState, setFilterTimeState] =
    useRecoilState(homeFilterTimeState);

  return (
    <div>
      <h1>Home</h1>
      <ContentCardItem recentContent={dummy_content} />
      {functionToggle.homePageToggle ? <p>Toggle On</p> : <p>Toggle Off</p>}
      {functionToggle.buttonToggle ? (
        <Button title="퀴즈 풀래요" status="active" onClick={clickBtn} />
      ) : null}
      {functionToggle.dropDownToggle ? (
        <DropDown itemList={dropDownList} placeHolder="직무 선택" />
      ) : null}
      {functionToggle.filterBarToggle ? (
        <FilterBar
          filterBtnState={filterBtnState}
          setFilterBtnState={setFilterBtnState}
          filterTimeState={filterTimeState}
          setFilterTimeState={setFilterTimeState}
        />
      ) : null}
    </div>
  );
}
