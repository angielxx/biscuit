import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContentCardItem from '../components/common/ContentCardItem';
import SmallCategory from '../components/common/SmallCategory';
import tw, { styled, css } from 'twin.macro';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { get_category_contents } from '../api/api';

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
  credit_by: string;
  created_date: string;
  time_cost: number;
  type: string;
  isMarked: boolean;
  tags: Array<string>;
}

const Category = () => {
  // 카테고리명
  const [categoryName, setCategoryName] = useState<string>('');
  // 조회 결과
  const [categoryResult, setCategoryResult] = useState<Array<content>>([]);
  const { name } = useParams();

  useEffect(() => {
    if (name) setCategoryName(name);
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['get_catetory_contents'],
      enabled: !!categoryName,
      queryFn: ({ pageParam = 0 }) =>
        get_category_contents(categoryName, 20, pageParam),
      getNextPageParam: (lastPage) =>
        lastPage?.isLast ? undefined : lastPage?.nextPage,
    });
  console.log('data :', data);

  return (
    <div className="mt-20">
      <SmallCategory title={categoryName} />
      <CategoryContainer>
        {data?.pages.map((page, index) => (
          <>
            {page?.results?.map((result) => (
              <ContentCardItem key={result.id} recentContent={result} />
            ))}
          </>
        ))}
      </CategoryContainer>
    </div>
  );
};

export default Category;
