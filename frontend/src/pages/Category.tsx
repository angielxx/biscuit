import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContentCardItem from '../components/common/ContentCardItem';
import SmallCategory from '../components/common/SmallCategory';
import tw, { styled, css } from 'twin.macro';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { get_category_contents } from '../api/api';
import { useInView } from 'react-intersection-observer';
import Loading from '../components/common/Loading';
import { useRecoilState, useRecoilValue } from 'recoil';
import { homeFilterBtnState, homeFilterTimeState } from '../recoils/Home/Atoms';
import FilterBar from '../components/common/FilterBar/FilterBar';
import FilterBar2 from '../components/common/FilterBar/FilterBar2';

const CategoryContainer = styled.div`
  ${tw`flex flex-col px-4 gap-10 overflow-scroll pt-4`}
  ${css`
    height: calc(100vh - 203px);
  `}
`;

interface content {
  id: number;
  title: string;
  source: string; // 영상: video_id, 글: url
  creditBy: string;
  createdDate: string;
  timeCost: number;
  type: string;
  marked: boolean;
  tags: Array<string> | null;
  hit: number;
  img: string;
}

const timeFilterArr = [
  { start: 0, end: 5 },
  { start: 5, end: 10 },
  { start: 10, end: 20 },
  { start: 20, end: 30 },
  { start: 30, end: 60 },
  { start: 60, end: 180 },
  { start: 0, end: 1440 },
];

type filterItem = {
  id: number;
  content: string;
  status: boolean;
};

const Category = () => {
  // 카테고리명
  const [categoryName, setCategoryName] = useState<string>('');
  // 옵션 필터 (최근순, 인기순)
  const [option, setOption] = useState<'recent' | 'hit'>('recent');
  // 타입 (글, 영상)
  const [type, setType] = useState<'all' | 'article' | 'video'>('all');
  // 데이터 사이즈
  const [size, setSize] = useState<number>(20);

  const [timeFilterIdx, setTimeFilterIdx] = useState<number>(6);

  // 저장된 필터값
  const [filterBtnState, setFilterBtnState] =
    useRecoilState(homeFilterBtnState);
  const [filterTimeState, setFilterTimeState] =
    useRecoilState(homeFilterTimeState);
  const timeFilter = useRecoilValue(homeFilterTimeState);
  const typeFilter = useRecoilValue(homeFilterBtnState);

  // url에 담긴 카테고리 이름
  const { name } = useParams();
  useEffect(() => {
    // url에서 카테고리 이름 가져오기
    if (name) setCategoryName(name);

    // Recoil에서 타임필터 가져오기
    timeFilter.forEach((time: filterItem) => {
      if (time.status === true) setTimeFilterIdx(time.id);
    });

    // 타입 필터 가져오기
    if (!typeFilter[0] && !typeFilter[1]) setType('all');
    else if (typeFilter[0]) setType('video');
    else if (typeFilter[1]) setType('article');
  }, [name, timeFilter, typeFilter]);

  // 스크롤 옵져버
  const { ref, inView } = useInView();

  // 다음 페이지 로딩
  useEffect(() => {
    console.log('hasNextPage :', hasNextPage);
    if (inView) {
      fetchNextPage();
      console.log('view', inView);
    }
  }, [inView]);

  // 무한스크롤 데이터 패칭
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['get_catetory_contents', categoryName, option, type],
      enabled: categoryName !== '',
      queryFn: ({ pageParam = 999999 }) =>
        get_category_contents(
          categoryName,
          option,
          type,
          size,
          pageParam,
          0,
          1440
          // 시간 필터 제외
          // timeFilterArr[timeFilterIdx].start,
          // timeFilterArr[timeFilterIdx].end
        ),
      getNextPageParam: (lastPage) => {
        return lastPage?.isLast ? undefined : lastPage?.nextLastContentId;
      },
      // staleTime: 1000 * 60 * 30,
      // cacheTime: 1000 * 60 * 35,
    });

  return (
    <div className="mt-20">
      <SmallCategory title={categoryName} selectList={[]} />
      <FilterBar2
        filterBtnState={filterBtnState}
        setFilterBtnState={setFilterBtnState}
        setOption={setOption}
      />
      <CategoryContainer>
        {data?.pages.map((page, index: number) => (
          <React.Fragment key={index}>
            {page?.contentList?.map((content) => (
              <ContentCardItem key={content.id} content={content} />
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
      </CategoryContainer>
    </div>
  );
};

export default Category;
