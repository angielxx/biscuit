import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContentCardItem from '../components/common/ContentCardItem';
import SmallCategory from '../components/common/SmallCategory';
import tw, { styled, css } from 'twin.macro';

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
  const { id } = useParams();

  useEffect(() => {
    // API 요청 : 카테고리 컨텐츠 목록 조회
    setCategoryName('React');
    setCategoryResult([
      {
        id: 1,
        title: '이은지의 자바스크립트',
        url: 'https://velog.io/@94applekoo/45.-프로미스',
        credit_by: '이은지',
        created_date: '2023-03-22',
        time_cost: 0,
        type: '타입',
        isMarked: false,
        tags: ['Typescript', 'Redux-saga', 'Redux-persist'],
      },
      {
        id: 2,
        title: '이은지의 리액트',
        url: 'https://velog.io/@94applekoo/React-createPortal',
        credit_by: '이은지',
        created_date: '2023-03-21',
        time_cost: 0,
        type: '타입',
        isMarked: false,
        tags: ['Typescript', 'Javascript'],
      },
      {
        id: 3,
        title: '이은지의 CS',
        url: 'https://velog.io/@94applekoo/CS-프로세스와-스레드',
        credit_by: '이은지',
        created_date: '2023-03-21',
        time_cost: 0,
        type: '타입',
        isMarked: false,
        tags: ['Typescript', 'Javascript', 'Redux-saga'],
      },
    ]);
  }, []);

  return (
    <div className="mt-20">
      <SmallCategory title={categoryName} />
      <CategoryContainer>
        {categoryResult &&
          categoryResult.map((content) => (
            <ContentCardItem recentContent={content} />
          ))}
      </CategoryContainer>
    </div>
  );
};

export default Category;
