import React, { useEffect, useState } from 'react';
import tw, { styled, css } from 'twin.macro';
import {
  startTimeState,
  isStartState,
  isModalOpenState,
  recentContentState,
  endTimeState,
} from '../../recoils/Contents/Atoms';

// icon
import MoreIcon from '../../assets/icons/more.svg';
import { useRecoilState, useSetRecoilState } from 'recoil';

// Styled component
const TextInfo = styled.div`
  ${tw`w-full`}
  ${css`
    width: calc(100% - 96px);
  `}
`;

const StoreItemContainer = styled.div`
  ${tw`flex justify-between bg-dark-evaluated rounded p-4 relative cursor-pointer gap-4 hover:bg-dark-primary-var text-ellipsis`}
  p {
    ${tw`text-main text-white text-ellipsis`}
  }
  span {
    ${tw`text-sub text-subColor`}
  }

  svg {
    ${tw`fill-dark-grey30`}
  }
  &:hover {
    p {
      ${tw`text-black text-ellipsis`}
    }
    span {
      ${tw`text-dark-grey30`}
    }
    svg {
      ${tw`fill-dark-grey70`}
    }
  }
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

interface StoreItemProps {
  content: content;
}

const StoreItem = ({ content }: StoreItemProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  // 썸네일 이미지
  const [thumbImg, setThumbImg] = useState<string | undefined>('');
  // url
  const [url, setUrl] = useState<string>('');

  // 타입에 따라 썸네일, url 설정
  useEffect(() => {
    if (content.type === 'VIDEO') {
      setUrl(`https://youtu.be/${content.source}`);
      setThumbImg(`https://img.youtube.com/vi/${content.source}/0.jpg`);
    } else {
      setUrl(content.source);
    }
  }, [content]);

  // 날짜 포맷
  const stringToDate = (date: string) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return `${year}.${month}.${day}`;
  };

  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const setContent = useSetRecoilState(recentContentState);

  const clickContentHandler = (url: string) => {
    window.open(url, '_blank', 'noopener, noreferrer');
    // setStartTime(Number(Date.now().toString()));
    // setIsStart(true);
    if (!isModalOpen) {
      setIsModalOpen(true);
      setContent(content);
    }
  };

  return (
    <StoreItemContainer
      onClick={(e) => {
        if (e.target === e.currentTarget) clickContentHandler(url);
      }}
    >
      <div className="w-10 h-10 shrink-0 bg-primary rounded-full"></div>
      <TextInfo id="text">
        <p
          className="truncate text-main-bold"
          onClick={(e) => {
            if (e.target === e.currentTarget) clickContentHandler(url);
          }}
        >
          {content.title}
        </p>
        <span>
          {content.creditBy} | {stringToDate(content.createdDate)}{' '}
        </span>
      </TextInfo>
      <div
        className="relative px-2 h-6 flex justify-end"
        onClick={(e) => {
          setShowMore(true);
        }}
      >
        <svg
          className="fill-dark-grey30"
          width="4"
          height="16"
          viewBox="0 0 4 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z" />
        </svg>
        {showMore && (
          <div
            className="bg-black text-white rounded absolute px-3 py-1 z-10 right-0 w-fit truncate border-[1px] top-6 border-primary hover:bg-dark-primary-var"
            onMouseLeave={() => setShowMore(false)}
          >
            <span>삭제</span>
          </div>
        )}
      </div>
    </StoreItemContainer>
  );
};

export default StoreItem;
