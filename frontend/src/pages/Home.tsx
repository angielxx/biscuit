import { useRecoilState, useRecoilValue } from 'recoil';
import FilterBar from '../components/common/FilterBar/FilterBar';
import { functionToggleState } from '../recoils/FuntionToggle/Atoms';
import { homeFilterBtnState, homeFilterTimeState } from '../recoils/Home/Atoms';
import { useState } from 'react';
import Banner from '../components/Home/Banner';
import tw from 'twin.macro';
import HomeContents from '../components/Home/HomeContents';
import ContentCardItem from '../components/common/ContentCardItem';

const HomeContainer = tw.div`
  flex-col w-screen justify-center
`;

export default function Home() {
  const functionToggle = useRecoilValue(functionToggleState);

  const [filterBtnState, setFilterBtnState] =
    useRecoilState(homeFilterBtnState);
  const [filterTimeState, setFilterTimeState] =
    useRecoilState(homeFilterTimeState);

  // 임시
  const content = {
    id: 3333,
    title: '물리 퍼즐게임 - 물리이벤트로 동글 합치기 [유니티 기초 강좌 B56]',
    source: 'RvDaDt-469E',
    creditBy: '골드메탈',
    createdDate: '2021-09-12',
    timeCost: 26,
    type: 'VIDEO',
    marked: false,
    tags: null,
    hit: 2998,
  };
  return (
    <HomeContainer>
      {/* { functionToggle.buttonToggle ? <Button title="퀴즈 풀래요" status="active" onClick={clickBtn}/> : null} */}
      {/* { functionToggle.dropDownToggle ? <DropDown itemList={dropDownList} placeHolder="직무 선택" /> : null} */}
      {functionToggle.bannerToggle ? <Banner /> : null}
      {functionToggle.filterBarToggle ? (
        <FilterBar
          filterBtnState={filterBtnState}
          setFilterBtnState={setFilterBtnState}
          filterTimeState={filterTimeState}
          setFilterTimeState={setFilterTimeState}
        />
      ) : null}
      <ContentCardItem content={content} />
      {functionToggle.homeContentsToggle ? <HomeContents /> : null}
    </HomeContainer>
  );
}
