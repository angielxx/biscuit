import tw, { styled, css } from "twin.macro";
import ContentCardItem from "../common/ContentCardItem";

const ContentListContainer = tw.div`
  flex-col
`;

const ListTitleContatiner = tw.div`
  flex
`;

const Logo = styled.div``;

const Title = tw.span`text-white text-main mb-2`;

const RowListContainer = tw.div`
  flex flex-row w-fit h-fit gap-x-4 flex-nowrap
`;

const ContentContainer = styled.span`
  ${tw`flex h-[310px]`}
  ${css`width: 85vw`}
`

interface HomeComentListProps {
  category: string;
}

const HomeContentList = ({category}: HomeComentListProps) => {
  // 해당 카테고리에 맞는 글들 불러오기
  // api 작업 후 구조 생각
  const dummyContents = [
    {
      id: 1,
      title: "이은지의 자바스크립트",
      url: "https://velog.io/@94applekoo/45.-프로미스",
      credit_by: "이은지",
      created_date: "2023-03-22",
      time_cost: 0,
      type: "타입",
      isMarked: false,
      tags: [1, 2, 3],
      channelImg: "",
      thumbnailImg: "https://velog.velcdn.com/images/94applekoo/post/5b147a23-0e76-4abc-9280-6fce0fc98289/image.png",
    },
    {
      id: 2,
      title: "이은지의 리액트",
      url: "https://velog.io/@94applekoo/React-createPortal",
      credit_by: "이은지",
      created_date: "2023-03-21",
      time_cost: 0,
      type: "타입",
      isMarked: false,
      tags: [1, 2, 3],
      channelImg: "",
      thumbnailImg: "https://velog.velcdn.com/images/94applekoo/post/89000717-2e9b-4748-986a-a36f35dbe1a2/image.png",
    },
    {
      id: 3,
      title: "이은지의 CS",
      url: "https://velog.io/@94applekoo/CS-프로세스와-스레드",
      credit_by: "이은지",
      created_date: "2023-03-21",
      time_cost: 0,
      type: "타입",
      isMarked: false,
      tags: [1, 2, 3],
      channelImg: "",
      thumbnailImg: "https://velog.velcdn.com/images/94applekoo/post/9bd49db5-bbae-4cfc-9af1-e0e130a73bbe/image.png",
    },
  ];

  return (
    <ContentListContainer>
      <ListTitleContatiner>
        <Logo />
        <Title>{category}</Title>
      </ListTitleContatiner>
      <RowListContainer>
        {
          dummyContents?.map((content) => {
            return (
              <ContentContainer>
                <ContentCardItem recentContent={content} />
              </ContentContainer>
            )
          })
        }
      </RowListContainer>
    </ContentListContainer>
  );
}

export default HomeContentList;