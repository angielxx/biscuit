import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContentCardItem from '../components/common/ContentCardItem';
import SmallCategory from '../components/common/SmallCategory';
import tw, { styled, css } from 'twin.macro';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { get_category_contents } from '../api/api';
import { useInView } from 'react-intersection-observer';
import Loading from '../components/common/Loading';

const CategoryContainer = styled.div`
  ${tw`flex flex-col px-4 gap-10 overflow-scroll pt-4`}
  ${css`
    height: calc(100vh - 145px);
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

const Category = () => {
  // 카테고리명
  const [categoryName, setCategoryName] = useState<string>('');
  // 정렬 필터
  const [sort, setSort] = useState<string | null>(null);
  // 시간 필터
  const [time, setTime] = useState<number | null>(null);
  // 데이터 사이즈
  const [size, setSize] = useState<number>(20);

  // url에 담긴 카테고리 이름
  const { name } = useParams();

  // 스크롤 옵져버
  const { ref, inView } = useInView();

  // url에서 카테고리 이름 가져오기
  useEffect(() => {
    if (name) setCategoryName(name);
  }, [name]);

  // 다음 페이지 로딩
  useEffect(() => {
    if (inView && !isFetchingNextPage && fetchNextPage) fetchNextPage();
  }, [inView]);

  // 무한스크롤 데이터 패칭
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['get_catetory_contents', categoryName],
      enabled: !!categoryName,
      queryFn: ({ pageParam = 999 }) =>
        get_category_contents(categoryName, sort, time, pageParam, size),
      getNextPageParam: (lastPage) =>
        lastPage?.isLast ? undefined : lastPage?.nextLastContentId,
    });

  return (
    <div className="mt-20">
      <SmallCategory title={categoryName} selectList={[]} />
      <CategoryContainer>
        {data?.pages.map((page, index: number) => (
          <React.Fragment key={index}>
            {page?.contentList?.map((content) => (
              <ContentCardItem key={content.id} content={content} />
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
      </CategoryContainer>
    </div>
  );
};

export default Category;
