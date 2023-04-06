import tw, { styled, css } from 'twin.macro';
import ContentCardItem from '../common/ContentCardItem';
import { useQuery } from '@tanstack/react-query';
import { get_personal_contents } from '../../api/contents';
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

interface Props {
  option: string;
}

type CategoryObjType = {
  [index: string]: string;
  fit: string;
};

const CategoryObj: CategoryObjType = {
  fit: '지금 딱 필요한',
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

const FitContent = ({ option }: Props) => {
  const timeFilter = useRecoilValue(homeFilterTimeState);
  const [timeFilterIdx, setTimeFilterIdx] = useState(6);
  const typeFilter = useRecoilValue(homeFilterBtnState);

  const [showingIdx, setShowingIdx] = useState<number>();
  const [order, setOrder] = useState<number[]>([]);

  useEffect(() => {
    let timeIdx: number = 6;
    timeFilter.forEach((time: filterItem) => {
      if (time.status === true) timeIdx = time.id;
    });
    setTimeFilterIdx(timeIdx);
  }, [timeFilter]);

  // 해당 카테고리에 맞는 글들 불러오기
  const { data } = useQuery({
    queryKey: ['get_personal_contents', option, timeFilterIdx, typeFilter],
    queryFn: () => {
      const randomOrder = [0, 10, 20, 30, 40].sort(() => Math.random() - 0.5);
      setOrder([...randomOrder]);
      setShowingIdx(order.shift());

      localStorage.removeItem('OrderArray');
      localStorage.setItem('OrderArray', JSON.stringify(randomOrder));

      const fromTo = timeFilterArr[timeFilterIdx];
      const type =
        typeFilter[0] === true
          ? 'video'
          : typeFilter[1] === true
          ? 'article'
          : 'all';
      return get_personal_contents(option, fromTo, type);
    },
    enabled: !!(
      timeFilterIdx !== undefined &&
      typeFilter !== undefined &&
      order?.length === 0
    ),
    staleTime: 60 * 60 * 1000,
    cacheTime: Infinity,
  });

  useEffect(() => {
    const myOrderString = localStorage.getItem('OrderArray');
    if (myOrderString) {
      const myOrder = JSON.parse(myOrderString);
      setOrder([...myOrder]);
      setShowingIdx(order.shift());
      localStorage.removeItem('OrderArray');
      localStorage.setItem('OrderArray', JSON.stringify(myOrder));
      return;
    }
    const randomOrder = [0, 10, 20, 30, 40].sort(() => Math.random() - 0.5);
    setOrder([...randomOrder]);
    setShowingIdx(order.shift());
    localStorage.removeItem('OrderArray');
    localStorage.setItem('OrderArray', JSON.stringify(randomOrder));
  }, []);

  return (
    <>
      <ListTitleContatiner>
        <Icon category={option} />
        <Title>{CategoryObj[option]}</Title>
      </ListTitleContatiner>
      <ContentListContainer>
        <RowListContainer>
          {data?.map((content, idx) => {
            return (
              showingIdx &&
              idx >= showingIdx &&
              idx < showingIdx + 10 && (
                <ContentContainer key={idx}>
                  {!('items' in content) ? (
                    <ContentCardItem content={content} />
                  ) : null}
                </ContentContainer>
              )
            );
          })}
        </RowListContainer>
      </ContentListContainer>
    </>
  );
};

export default FitContent;
