import { useRecoilState, useRecoilValue } from "recoil"
import Button from "../components/common/Button";
import DropDown from "../components/common/DropDown/DropDown";
import FilterBar from "../components/common/FilterBar/FilterBar";
import { functionToggleState } from "../recoils/FuntionToggle/Atoms"
import { homeFilterBtnState, homeFilterTimeState } from "../recoils/Home/Atoms";
import { useState } from "react";
import Banner from "../components/Home/Banner";
import tw from "twin.macro";
import HomeContents from "../components/Home/HomeContents";

const HomeContainer = tw.div`
  flex-col w-screen justify-center
`

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
    id: 3,
    title: '이은지의 CS',
    url: 'https://velog.io/@94applekoo/CS-프로세스와-스레드',
    credit_by: '이은지',
    created_date: '2023-03-21',
    time_cost: 0,
    type: '타입',
    isMarked: false,
    tags: ['Typescript', 'Javascript', 'Redux-saga'],
    // channelImg: "",
    // thumbnailImg: "https://velog.velcdn.com/images/94applekoo/post/9bd49db5-bbae-4cfc-9af1-e0e130a73bbe/image.png",
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
    <HomeContainer>
      { functionToggle.buttonToggle ? <Button title="퀴즈 풀래요" status="active" onClick={clickBtn}/> : null}
      { functionToggle.dropDownToggle ? <DropDown itemList={dropDownList} placeHolder="직무 선택" /> : null}
      { functionToggle.bannerToggle ? <Banner /> : null}
      { functionToggle.filterBarToggle
        ? <FilterBar 
          filterBtnState={filterBtnState}
          setFilterBtnState={setFilterBtnState}
          filterTimeState={filterTimeState}
          setFilterTimeState={setFilterTimeState}
        />
        : null
      }
      { functionToggle.homeContentsToggle ? <HomeContents /> : null }
    </HomeContainer>
  );
}
