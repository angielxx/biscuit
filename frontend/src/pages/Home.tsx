import { useRecoilState, useRecoilValue } from "recoil"
import FilterBar from "../components/common/FilterBar/FilterBar";
import { functionToggleState } from "../recoils/FuntionToggle/Atoms"
import { homeFilterBtnState, homeFilterTimeState } from "../recoils/Home/Atoms";
import { useState } from "react";
import Banner from "../components/Home/Banner";
import tw from "twin.macro";
import HomeContents from "../components/Home/HomeContents";
import { useQuery } from "@tanstack/react-query";
import { get_popular_contents } from "../api/contents";

const HomeContainer = tw.div`
  flex-col w-screen justify-center
`

export default function Home() {
  const functionToggle = useRecoilValue(functionToggleState);

  const [filterBtnState, setFilterBtnState] =
    useRecoilState(homeFilterBtnState);
  const [filterTimeState, setFilterTimeState] =
    useRecoilState(homeFilterTimeState);

  // 어케 쓰는 거야 도대체,,
  const { data, isLoading, error } = useQuery(
    'get_popular_contents',
    get_popular_contents,
  );

  return (
    <HomeContainer>
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
