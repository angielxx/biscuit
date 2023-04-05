import { QueryCache, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import defaultImg from '../../assets/image/default_thumbnail_img.png';
import {
  startTimeState,
  isStartState,
  isModalOpenState,
  recentContentState,
  endTimeState,
} from '../../recoils/Contents/Atoms';

// twin macro
import tw, { styled, css, TwStyle } from 'twin.macro';
import { useGetMetaData } from '../../hooks/useGetMetaData';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Styled component
const Tag = styled.div`
  ${tw`rounded-full text-tiny px-[10px] py-1 bg-dark-grey50 w-fit `}
`;

const Thumbnail = styled.div<{ image: string | undefined }>`
  ${tw`aspect-w-16 aspect-h-9 bg-center rounded-10 relative cursor-pointer`}
  ${({ image }) =>
    image
      ? css`
          background-image: url('${image}');
        `
      : css`
          background-image: url('src/assets/image/default_thumbnail_image.png');
        `}
  ${css`
    background-size: 102%;
    transition: background-size 0.2s ease;
    -moz-transition: background-size 0.2s ease;
    -web-kit-transition: background-size 0.2s ease;
  `}
  &:hover {
    background-size: 110%;
  }
`;

const MarkBtnArea = styled.div<{ hidden: boolean }>`
  ${tw`cursor-pointer`}
  ${({ hidden }) => (hidden ? tw`hidden` : tw``)}
`;

const BookmarkSvg = styled.svg`
  ${tw`fill-primary h-8 cursor-pointer`}
`;

const ContentInfo = styled.div`
  ${tw`flex gap-2 relative w-full justify-between`}
  p {
    ${tw`text-main`}
  }
  span {
    ${tw`text-sub text-subColor`}
  }
`;

const TextInfo = styled.div`
  ${css`
    word-break: keep-all;
  `}
`;

// Main component
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

interface ContentCardItemProps {
  content: content;
}

const ContentCardItem = ({ content }: ContentCardItemProps) => {
  // 북마크 저장 여부
  const [isMarked, setIsMarked] = useState<boolean>(content.marked);
  // 요약
  const [desc, setDesc] = useState<string | null>('');
  // 썸네일 이미지
  const [thumbImg, setThumbImg] = useState<string | undefined>('');
  // url
  const [url, setUrl] = useState<string>('');
  // 로그인 여부
  const isAuth = false;

  // 타입에 따라 썸네일, url 설정
  const queryClient = useQueryClient();
  useEffect(() => {
    if (content.type === 'VIDEO') {
      setUrl(`https://youtu.be/${content.source}`);
      setThumbImg(`https://img.youtube.com/vi/${content.source}/0.jpg`);
    } else {
      // const cacheImg = queryClient.getQueryData(['thumbnail', content.id]) as
      //   | string
      //   | undefined;
      setUrl(content.source);
      setThumbImg(content.img);
    }
    return () => {
      setThumbImg('');
    };
  }, [content.id]);

  // 썸네일 가져오는 함수 (queryFn)
  const getMetaData = async (url: string) => {
    const data = await useGetMetaData(url);
    return data?.image;
  };

  // 리액트 쿼리로 썸네일 가져오기
  const { data } = useQuery({
    queryKey: ['thumbnail', content.id],
    queryFn: () => getMetaData(content.source),
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60,
    enabled: content.type === 'ARTICLE',
    onSuccess: (image) => setThumbImg(image),
  });

  // 날짜 포맷
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

  const startTime = useRecoilValue(startTimeState);
  const setStartTime = useSetRecoilState(startTimeState);
  const setIsStart = useSetRecoilState(isStartState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const setContent = useSetRecoilState(recentContentState);

  const clickContentHandler = (url: string) => {
    window.open(url, '_blank', 'noopener, noreferrer');
    setStartTime(Number(Date.now().toString()));
    // console.log(Date.now().toString());
    setIsStart(true);
    if (!isModalOpen) {
      setIsModalOpen(true);
      setContent(content);
      // console.log('content :', content);
    }
  };

  return (
    <div
      id="content-area"
      className="flex flex-col gap-4 text-white w-full min-w-[240px]"
    >
      <div className="flex gap-2">
        {content.tags &&
          content.tags.map((tag, index) => (
            <Tag key={index}>
              <span>{tag}</span>
            </Tag>
          ))}
      </div>

      <button onClick={() => clickContentHandler(url)} className="w-full">
        <Thumbnail image={thumbImg} />
      </button>

      <ContentInfo>
        {/* <div id="channel"></div> */}
        <TextInfo id="text">
          <p
            className="leading-5 max-h-[40px] overflow-hidden cursor-pointer text-main-bold hover:text-main-bold hover:text-primary"
            onClick={() => clickContentHandler(url)}
          >
            {content.title}
          </p>
          <span>
            {content.creditBy} | {stringToDate(content.createdDate)}{' '}
          </span>
        </TextInfo>
        {isAuth && (
          <div onClick={changeMarkHandler}>
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
        )}
      </ContentInfo>
    </div>
  );
};

export default ContentCardItem;
