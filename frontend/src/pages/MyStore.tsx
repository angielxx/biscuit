import React, { useState } from 'react';
import TabBar from '../components/MyStore/TabBar';

// Icons
import historyIcon from '../assets/icons/history.svg';
import bookmarkIcon from '../assets/icons/bookmark.svg';

const MyStore = (props) => {
  // 탭
  const [clickedTab, setClickedTab] = useState<number>(0);
  // 북마크
  const [bookmarks, setBookmarks] = useState();
  // 히스토리
  const [histories, setHistories] = useState();

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
    <div>
      <TabBar
        tabList={tabList}
        onClick={setClickedTab}
        clickedTab={clickedTab}
      />
      <div></div>
    </div>
  );
};

export default MyStore;
