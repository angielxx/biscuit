import tw, { styled, css } from "twin.macro";
import ContentCardItem from "../common/ContentCardItem";
import { useQuery } from "@tanstack/react-query";
import { get_home_contents } from "../../api/contents";

const ContentListContainer = tw.div`
  flex-col p-4 w-full overflow-scroll snap-x mx-4 mb-4
`;

const ListTitleContatiner = tw.div`
  flex mx-4 mt-2
`;

const Logo = tw.img`w-9 h-9 mr-2`

const MyLogo = ({ category }: { category: string }) => {
  return <Logo src={`src/assets/icons/${category}.svg`} />;
};

const Title = tw.span`text-white text-h2 mb-2`;

const RowListContainer = styled.div`
  ${tw`flex flex-row h-fit w-fit gap-x-4 flex-nowrap mr-4`}
  ${css`width: calc(100vw - 32px)`}

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentContainer = styled.div`
  ${tw`flex h-fit snap-start`}
  ${css`width: 85vw`}
`

interface HomeComentListProps {
  category: string;
}

type CategoryObjType = {
  [index: string]: string;
  popular: string;
  recent: string;
}

const CategoryObj: CategoryObjType = {
  popular: "가장 인기 있는",
  recent: "최근 업로드 된",
}

const HomeContentList = ({category}: HomeComentListProps) => {
  // 해당 카테고리에 맞는 글들 불러오기
  const { data, isLoading, error } = useQuery(
    ['get_home_contents', category],
    () => get_home_contents(category, 0),
  );

  return (
    <>
      <ListTitleContatiner>
        <MyLogo category={category} />
        <Title>{CategoryObj[category]}</Title>
      </ListTitleContatiner>
      <ContentListContainer>
        <RowListContainer>
          {
            data?.map((content, idx) => {
              return (
                <ContentContainer key={idx}>
                  <ContentCardItem recentContent={content} />
                </ContentContainer>
              )
            })
          }
        </RowListContainer>
      </ContentListContainer>
    </>
  );
}

export default HomeContentList;