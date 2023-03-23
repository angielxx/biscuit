import tw, { styled, css } from "twin.macro";
import ContentCardItem from "../common/ContentCardItem";

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

// const Logo = styled.img((props: { category: string }) => [
//   tw`w-9 h-9`,
//   css`
//     background-size: cover;
//     background-image: url("../../assets/icons/${props.category}.svg")
//   `
// ]);

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
      tags: ["Typescript", "Redux-saga", "Redux-persist"],
      channelImg: "",
      thumbnailImg: "",
    },
    {
      id: 2,
      title: ".",
      url: "https://velog.io/@94applekoo/CS-프로세스와-스레드",
      credit_by: ".",
      created_date: ".",
      time_cost: 0,
      type: "타입",
      isMarked: false,
      tags: [".",],
      channelImg: "",
      thumbnailImg: "",
    },
    {
      id: 3,
      title: "이은지의 리액트",
      url: "https://velog.io/@94applekoo/React-createPortal",
      credit_by: "이은지",
      created_date: "2023-03-21",
      time_cost: 0,
      type: "타입",
      isMarked: false,
      tags: ["Typescript", "Recoil", "Zustand"],
      channelImg: "",
      thumbnailImg: "",
    },
    {
      id: 4,
      title: "이은지의 CS",
      url: "https://velog.io/@94applekoo/CS-프로세스와-스레드",
      credit_by: "이은지",
      created_date: "2023-03-21",
      time_cost: 0,
      type: "타입",
      isMarked: false,
      tags: ["Redux-saga", "Redux-persist", "Zustand"],
      channelImg: "",
      thumbnailImg: "",
    },
  ];

  return (
    <>
      <ListTitleContatiner>
        <MyLogo category={category} />
        <Title>{CategoryObj[category]}</Title>
      </ListTitleContatiner>
      <ContentListContainer>
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
    </>
  );
}

export default HomeContentList;