import React, { useEffect, useState } from 'react';
import { InView, useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import tw, { styled, css } from 'twin.macro';

// Icons
import historyIcon from '../assets/icons/history.svg';
import bookmarkIcon from '../assets/icons/bookmark.svg';

// Component
import StoreItem from '../components/MyStore/BookmarkItem';
import TabBar from '../components/MyStore/TabBar';

// API
import { get_bookmark } from '../api/bookmark';
import { get_history } from '../api/history';
import BookmarkItem from '../components/MyStore/BookmarkItem';
import Loading from '../components/common/Loading';

// Styled component
const ItemsContainer = styled.div`
  ${tw`flex flex-col px-4 gap-2 overflow-scroll pt-4`}
  ${css`
    height: calc(100vh - 145px);
  `}
`;

// Type
interface Bookmark {
  bookmarkId: number;
  contentId: number;
  createdDate: string;
  creditBy: string;
  hit: number;
  marked: boolean;
  source: string;
  tags: string[];
  timeCost: number;
  title: string;
  type: string;
}

interface History {
  memberHistoryId: number;
  contentId: number;
  title: string;
  url: string;
  writer: string;
  creditBy: string;
  createdDate: string;
  timeCost: number;
  type: string;
  marked: boolean;
  tags: string[];
  hit: number;
}

const MyStore = () => {
  // 탭
  const [clickedTab, setClickedTab] = useState<number>(0);

  // 북마크, 히스토리 get
  // const result = useQueries({
  //   queries: [
  //     {
  //       queryKey: ['get_bookmark'],
  //       queryFn: () => get_bookmark(),
  //       onSuccess: (data) => setBookmarks(data),
  //     },
  //     {
  //       queryKey: ['get_history'],
  //       queryFn: () => get_history(),
  //       onSuccess: (data) => setHistories(data),
  //     },
  //   ],
  // });

  // 북마크 get
  const {
    data: bookmarkData,
    fetchNextPage: bookmarkFetchNextPage,
    hasNextPage: bookmarkHasNextPage,
    isFetchingNextPage: bookmarkIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['get_bookmark'],
    queryFn: ({ pageParam = 999999 }) => get_bookmark(pageParam, 20),
    getNextPageParam: (lastPage) => {
      return lastPage?.isLast ? undefined : lastPage?.nextLastContentId;
    },
    enabled: clickedTab === 0,
  });

  // 히스토리 get
  const {
    data: historyData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['get_history'],
    queryFn: ({ pageParam = 999999 }) => get_history(pageParam, 20),
    getNextPageParam: (lastPage) => {
      return lastPage?.isLast ? undefined : lastPage?.nextLastContentId;
    },
    enabled: clickedTab === 1,
  });

  // 스크롤 옵져버
  const { ref, inView } = useInView();

  // 다음 페이지 로딩
  useEffect(() => {
    if (clickedTab === 0 && inView) {
      console.log('here');
      bookmarkFetchNextPage();
    }
    if (clickedTab === 1 && inView) {
      fetchNextPage();
    }
  }, [inView]);

  const tabList = [
    {
      title: '북마크',
      icon: (
        <svg
          width="22"
          height="30"
          viewBox="0 0 22 30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.8571 0.5H3.14286C1.41429 0.5 0 1.95 0 3.72222V29.5L11 24.6667L22 29.5V3.72222C22 1.95 20.5857 0.5 18.8571 0.5ZM18.8571 24.6667L11 21.1544L3.14286 24.6667V3.72222H18.8571V24.6667Z" />
        </svg>
      ),
    },
    {
      title: '히스토리',
      icon: (
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.4835 0C7.3755 0 0 7.168 0 16C0 24.832 7.3755 32 16.4835 32C25.608 32 33 24.832 33 16C33 7.168 25.608 0 16.4835 0ZM16.5 28.8C9.207 28.8 3.3 23.072 3.3 16C3.3 8.928 9.207 3.2 16.5 3.2C23.793 3.2 29.7 8.928 29.7 16C29.7 23.072 23.793 28.8 16.5 28.8ZM17.325 8H14.85V17.6L23.5125 22.64L24.75 20.672L17.325 16.4V8Z" />
        </svg>
      ),
    },
  ];

  return (
    <div id="myStore" className="mt-20">
      <TabBar
        tabList={tabList}
        onClick={setClickedTab}
        clickedTab={clickedTab}
      />
      <ItemsContainer>
        {clickedTab === 0 &&
          bookmarkData?.pages.map((page, index: number) => (
            <React.Fragment key={index}>
              {page?.bookmarkList?.map((bookmark) => (
                <BookmarkItem key={bookmark.bookmarkId} bookmark={bookmark} />
              ))}
            </React.Fragment>
          ))}
        {clickedTab === 1 &&
          historyData?.pages.map((page, index: number) => (
            <React.Fragment key={index}>
              {page?.historyList?.map((history) => (
                <BookmarkItem key={history.bookmarkId} bookmark={history} />
              ))}
            </React.Fragment>
          ))}
        {bookmarkIsFetchingNextPage ? <Loading /> : <div ref={ref} />}
      </ItemsContainer>
    </div>
  );
};

export default MyStore;
