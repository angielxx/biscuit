import React, { useState } from 'react';

// twin macro
import tw, { styled, css, TwStyle } from 'twin.macro';

// Styled component
const Tag = styled.div`
  ${tw`rounded-full text-tiny font-thin px-[10px] py-1 bg-dark-grey50 w-fit `}
`;

const Thumbnail = styled.div<{ image: string }>`
  ${tw`w-full aspect-w-16 aspect-h-9 bg-cover bg-center rounded-10 relative cursor-pointer`}
  ${({ image }) =>
    css`
      background-image: url(${image});
    `}
`;

const MarkBtnArea = styled.div<{ hidden: boolean }>`
  ${tw`cursor-pointer`}
  ${({ hidden }) => (hidden ? tw`hidden` : tw``)}
`;

const BookmarkSvg = styled.svg`
  ${tw`fill-primary absolute right-6 top-0 h-10`}
`;

const ContentInfo = styled.div<{ image: string }>`
  ${tw`flex gap-2`}
  p {
    ${tw`text-main`}
  }
  span {
    ${tw`text-sub text-subColor`}
  }

  #channel {
    ${tw`bg-primary w-10 h-10 rounded-full min-w-[40px] min-h-[40px]`}
    ${({ image }) => css`
      background-image: url(${image});
    `}
  }
`;

// Main component
interface recentContent {
  id: number;
  title: string;
  url: string;
  credit_by: string;
  created_date: string;
  time_cost: number;
  type: string;
  isMarked: boolean;
  tags: Array<number>;
  channelImg: string;
  thumbnailImg: string;
}

interface contentCardItemProps {
  recentContent: recentContent;
}

const ContentCardItem = ({ recentContent }: contentCardItemProps) => {
  // 북마크 저장 여부
  const [isMarked, setIsMarked] = useState(recentContent.isMarked);
  // 북마크 버튼 숨김
  const [hideMark, setHideMark] = useState(true);

  // 북마크 버튼 클릭 시
  const changeMarkHandler = () => {
    // API 요청 : 북마크 추가 혹은 삭제
    setIsMarked((prev) => {
      return !prev;
    });
  };

  return (
    <div id="content-area" className="flex flex-col gap-4">
      <h3 className="text-h3">방금 본 컨텐츠</h3>
      <div className="flex gap-2">
        {recentContent.tags.map((tag, index) => (
          <Tag key={index}>
            <span>{tag}</span>
          </Tag>
        ))}
      </div>
      <div className="relative">
        <a
          // href={'https://surfit.io/link/zMDjO'}
          href={recentContent.url}
          target="_blank"
        >
          <Thumbnail
            // image={
            //   'https://content.surfit.io/thumbs/image/KbMew/zMDjO/8136867456406dbc49eff3.jpg/cover-top-2x.webp'
            // }
            image={recentContent.thumbnailImg}
            onMouseEnter={() => setHideMark(false)}
            onMouseLeave={() => setHideMark(true)}
          />
        </a>
        <MarkBtnArea
          hidden={hideMark ? true : false}
          onMouseEnter={() => setHideMark(false)}
          onMouseLeave={() => setHideMark(true)}
          onClick={changeMarkHandler}
        >
          {isMarked ? (
            <BookmarkSvg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
            </BookmarkSvg>
          ) : (
            <BookmarkSvg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
            </BookmarkSvg>
          )}
        </MarkBtnArea>
      </div>
      <ContentInfo image={recentContent.channelImg}>
        <div id="channel"></div>
        <div id="text">
          <p>{recentContent.title}</p>
          <span>
            {recentContent.credit_by} | {recentContent.created_date}{' '}
          </span>
        </div>
      </ContentInfo>
    </div>
  );
};

export default ContentCardItem;
