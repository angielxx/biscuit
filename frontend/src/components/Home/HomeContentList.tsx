import tw, { styled, css } from 'twin.macro';
import ContentCardItem from '../common/ContentCardItem';
import { useQuery } from '@tanstack/react-query';
import { get_home_contents } from '../../api/contents';
import { useState } from 'react';

const ContentListContainer = tw.div`
  flex-col w-full overflow-scroll snap-x mx-4 mb-4
`;

const ListTitleContatiner = tw.div`
  flex mx-4 mt-2
`;

const Logo = tw.img`w-9 h-9 mr-2`;

const MyLogo = ({ category }: { category: string }) => {
  const imgSrc = `src/assets/icons/${category}.svg`;
  const [isExists, setIsExists] = useState(false);

  function checkLocalImgFileExists(imgSrc: string) {
    let img = new Image();
    img.src = imgSrc;
    img.onload = function () {
      setIsExists(true);
    };
    img.onerror = function () {
      setIsExists(false);
    };
  }
  checkLocalImgFileExists(imgSrc);

  return isExists === true ? <Logo src={imgSrc} /> : <Logo />;
};

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
  popular: string;
  recent: string;
};

const CategoryObj: CategoryObjType = {
  popular: '가장 인기 있는',
  recent: '최근 업로드 된',
};

interface content {
  id: number;
  title: string;
  url: string;
  creditBy: string;
  createdDate: string;
  timeCost: number;
  type: string;
  isMarked: boolean;
  tags: Array<string>;
  hit: number;
}

interface randomContent {
  category: string;
  items: content[];
}

const HomeContentList = ({ category }: HomeComentListProps) => {
  // 해당 카테고리에 맞는 글들 불러오기
  const { data, isLoading, error } = useQuery(
    ['get_home_contents', category],
    () => get_home_contents(category, category === 'category' ? 5 : 0),
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: Infinity,
    }
  );

  return (
    <>
      {category === 'category' ? (
        <>
          {data?.map((result) => {
            return (
              <>
                <ListTitleContatiner>
                  <MyLogo category={'items' in result ? result.category : ''} />
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
            <MyLogo category={category} />
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
