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

  return (
    <HomeContainer>
      {functionToggle.bannerToggle ? <Banner /> : null}
      {functionToggle.filterBarToggle ? (
        <FilterBar
          filterBtnState={filterBtnState}
          setFilterBtnState={setFilterBtnState}
          filterTimeState={filterTimeState}
          setFilterTimeState={setFilterTimeState}
        />
      ) : null}
      {functionToggle.homeContentsToggle ? <HomeContents /> : null}
    </HomeContainer>
  );
}
