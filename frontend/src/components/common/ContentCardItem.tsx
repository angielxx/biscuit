import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import defaultImg from '../../assets/image/default_thumbnail_img.png';
import {
  startTimeState,
  isStartState,
  isModalOpenState,
  recentContentState,
} from '../../recoils/Contents/Atoms';

// twin macro
import tw, { styled, css, TwStyle } from 'twin.macro';
import { useGetMetaData } from '../../hooks/useGetMetaData';
import { useRecoilState, useSetRecoilState } from 'recoil';

// Styled component
const Tag = styled.div`
  ${tw`rounded-full text-tiny px-[10px] py-1 bg-dark-grey50 w-fit `}
`;

const Thumbnail = styled.div<{ image: string | null }>`
  ${tw`w-full aspect-w-16 aspect-h-9 bg-cover bg-center rounded-10 relative cursor-pointer`}
  ${({ image }) =>
    image
      ? css`
          background-image: url('${image}');
        `
      : css`
          background-image: url('src/assets/image/default_thumbnail_image.png');
        `}
`;

const MarkBtnArea = styled.div<{ hidden: boolean }>`
  ${tw`cursor-pointer`}
  ${({ hidden }) => (hidden ? tw`hidden` : tw``)}
`;

const BookmarkSvg = styled.svg`
  ${tw`fill-primary h-8 cursor-pointer`}
`;

const ContentInfo = styled.div<{ image: string }>`
  ${tw`flex gap-2 relative`}
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

const TextInfo = styled.div`
  ${css`
    width: calc(100% - 80px);
  `}
`;

// Main component
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

interface contentCardItemProps {
  content: content;
}

const ContentCardItem = ({ content }: contentCardItemProps) => {
  // 북마크 저장 여부
  const [isMarked, setIsMarked] = useState<boolean>(content.marked);
  // 북마크 버튼 숨김
  const [hideMark, setHideMark] = useState<boolean>(true);
  // 요약
  const [desc, setDesc] = useState<string | null>('');

  const stringToDate = (date: string) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return `${year}.${month}.${day}`;
  };

  // 북마크 버튼 클릭 시
  const changeMarkHandler = () => {
    // API 요청 : 북마크 추가 혹은 삭제
    setIsMarked((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    useGetMetaData(content.url).then((data) => {
      // setThumbImg(data.image);
      // setDesc(data.desc);
    });
    console.log('useeffect: ', content);
  }, [content]);

  // 썸네일 가져오는 함수
  const getMetaData = async (url: string) => {
    const { image } = await useGetMetaData(url);
    return image;
  };

  const { data: thumbImg } = useQuery({
    queryKey: ['thumbnail', content.id],
    queryFn: () => getMetaData(content.url),
    staleTime: 1000 * 60 * 30,
  });

  const setStartTime = useSetRecoilState(startTimeState);
  const setIsStart = useSetRecoilState(isStartState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const setcontent = useSetRecoilState(recentContentState);

  const clickContentHandler = (url: string) => {
    window.open(url, '_blank', 'noopener, noreferrer');
    setStartTime(Date.now());
    setIsStart(true);
    if (!isModalOpen) {
      setIsModalOpen(true);
      setcontent(content);
      // console.log('content :', content);
    }
  };

  return (
    <div id="content-area" className="flex flex-col gap-4 text-white w-full">
      <div className="flex gap-2">
        {content.tags &&
          content.tags.map((tag, index) => (
            <Tag key={index}>
              <span>{tag}</span>
            </Tag>
          ))}
      </div>
      <div className="relative">
        <button
          onClick={() => clickContentHandler(content.url)}
          className="w-full"
        >
          <Thumbnail
            image={thumbImg ? thumbImg : ''}
            onMouseEnter={() => setHideMark(false)}
            onMouseLeave={() => setHideMark(true)}
          />
        </button>
        <MarkBtnArea
          hidden={hideMark ? true : false}
          onMouseEnter={() => setHideMark(false)}
          onMouseLeave={() => setHideMark(true)}
          onClick={changeMarkHandler}
        ></MarkBtnArea>
      </div>
      <ContentInfo image="">
        <div id="channel"></div>
        <TextInfo id="text">
          <p>{content.title}</p>
          <span>
            {content.creditBy} | {stringToDate(content.createdDate)}{' '}
          </span>
        </TextInfo>
        <div onClick={changeMarkHandler} className="absolute right-0">
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
        </div>
      </ContentInfo>
    </div>
  );
};

export default ContentCardItem;
