import React from 'react';
import tw, { styled } from 'twin.macro';

const TextInfo = styled.div`
  ${css`
    word-break: keep-all;
  `}
`;

interface content {
  id: number;
  title: string;
  url: string;
  creditBy: string;
  createdDate: string;
  timeCost: number;
  type: string;
  marked: boolean;
  tags: Array<string> | null;
  hit: number;
}

const StoreItem = (content: content) => {
  // 날짜 포맷
  const stringToDate = (date: string) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return `${year}.${month}.${day}`;
  };

  const clickContentHandler = (url: string) => {
    window.open(url, '_blank', 'noopener, noreferrer');
  };

  return (
    <div>
      <div className="aspect-w-1 aspect-h-1 fill-primary"></div>
      <TextInfo id="text">
        <p
          className="leading-5 max-h-[40px] overflow-hidden cursor-pointer text-main-bold hover:text-main-bold hover:text-primary"
          onClick={() => clickContentHandler(content.url)}
        >
          {content.title}
        </p>
        <span>
          {content.creditBy} | {stringToDate(content.createdDate)}{' '}
        </span>
      </TextInfo>
    </div>
  );
};

export default StoreItem;
