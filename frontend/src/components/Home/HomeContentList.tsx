import tw, { styled, css } from 'twin.macro';
import ContentCardItem from '../common/ContentCardItem';
import { useQuery } from '@tanstack/react-query';
import { get_home_contents } from '../../api/contents';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
  homeFilterBtnState,
  homeFilterTimeState,
} from '../../recoils/Home/Atoms';
import Icon from '../common/Icon';

const ContentListContainer = tw.div`
  flex-col w-full overflow-scroll snap-x mx-4 mb-4
`;

const ListTitleContatiner = tw.div`
  flex mx-4 mt-2
`;

const Title = tw.span`text-white text-h2 mb-2`;

const RowListContainer = styled.div`
  ${tw`flex flex-row h-fit w-fit gap-x-4 flex-nowrap mr-4`}

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentContainer = styled.div`
  ${tw`flex h-fit snap-start`}
  ${css`
    width: 85vw;
  `}
`;

interface HomeComentListProps {
  category: string;
}

type CategoryObjType = {
  [index: string]: string;
  hit: string;
  id: string;
};

const CategoryObj: CategoryObjType = {
  hit: '가장 인기 있는',
  id: '최근 업로드 된',
};

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

interface randomContent {
  category: string;
  items: content[];
}

type filterItem = {
  id: number;
  content: string;
  status: boolean;
};

const timeFilterArr = [
  { start: 0, end: 5 },
  { start: 5, end: 10 },
  { start: 10, end: 20 },
  { start: 20, end: 30 },
  { start: 30, end: 60 },
  { start: 60, end: 180 },
  { start: 0, end: 1440 },
];

const HomeContentList = ({ category }: HomeComentListProps) => {
  const timeFilter = useRecoilValue(homeFilterTimeState);
  const [timeFilterIdx, setTimeFilterIdx] = useState(6);
  const typeFilter = useRecoilValue(homeFilterBtnState);

  useEffect(() => {
    let timeIdx: number = 6;
    timeFilter.forEach((time: filterItem) => {
      if (time.status === true) timeIdx = time.id;
    });
    setTimeFilterIdx(timeIdx);
  }, [timeFilter]);

  // 해당 카테고리에 맞는 글들 불러오기
  const { data } = useQuery({
    queryKey: ['get_home_contents', category, timeFilterIdx, typeFilter],
    queryFn: async () => {
      const categoryCount = category === 'category' ? 5 : undefined;
      const type =
        typeFilter[0] === true
          ? 'video'
          : typeFilter[1] === true
          ? 'article'
          : 'all';
      const fromTo = timeFilterArr[timeFilterIdx];
      return await get_home_contents(category, categoryCount, fromTo, type);
    },
    enabled: !!(timeFilterIdx !== undefined && typeFilter !== undefined),
    staleTime: 60 * 60 * 1000,
    cacheTime: Infinity,
  });

  return (
    <>
      {category === 'category' ? (
        <>
          {data?.map((result, idx) => {
            return (
              <>
                <ListTitleContatiner key={idx}>
                  <Icon category={'items' in result ? result.category : ''} />
                  <Title>{'items' in result ? result.category : ''}</Title>
                </ListTitleContatiner>
                <ContentListContainer>
                  <RowListContainer>
                    {'items' in result
                      ? result.items?.map((content, idx) => {
                          return (
                            <ContentContainer key={idx}>
                              <ContentCardItem content={content} />
                            </ContentContainer>
                          );
                        })
                      : null}
                  </RowListContainer>
                </ContentListContainer>
              </>
            );
          })}
        </>
      ) : (
        <>
          <ListTitleContatiner>
            <Icon category={category} />
            <Title>{CategoryObj[category]}</Title>
          </ListTitleContatiner>
          <ContentListContainer>
            <RowListContainer>
              {data?.map((content, idx) => {
                return (
                  <ContentContainer key={idx}>
                    {!('items' in content) ? (
                      <ContentCardItem content={content} />
                    ) : null}
                  </ContentContainer>
                );
              })}
            </RowListContainer>
          </ContentListContainer>
        </>
      )}
    </>
  );
};

export default HomeContentList;
