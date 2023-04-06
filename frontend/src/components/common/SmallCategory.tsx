// css
import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';

const CategoryBox = styled.li`
  ${tw`flex flex-col items-start order-5 w-full px-4 py-3 gap-[10px] text-white border-b border-solid border-dark-grey10 cursor-pointer`}

  &.choose {
    ${tw`bg-dark-primary-var`}
  }
`;

const SubCategory = styled.div`
  ${tw`flex items-center h-fit p-0 gap-[13px]`}
`;

interface SmallProps {
  isClicked?: React.MouseEventHandler<HTMLLIElement>;
  title: string;
  selectList: string[];
}

const SmallCategory = ({ isClicked, title, selectList }: SmallProps) => {
  const [imgSrc, setImgSrc] = useState(`/assets/icons/category/${title}.svg`);
  const [isExists, setIsExists] = useState(false);

  function checkLocalImgFileExists(imgSrc: string) {
    let img = new Image();
    img.src = imgSrc;
    img.onload = function () {
      setIsExists(true);
    };
    img.onerror = function () {
      setImgSrc('/assets/icons/category/Default.svg');
      setIsExists(false);
    };
  }

  useEffect(() => {
    console.log('small category title :', title);
    checkLocalImgFileExists(imgSrc);
  }, [imgSrc, title]);

  return (
    <CategoryBox
      onClick={isClicked}
      className={selectList.includes(title) ? 'choose' : ''}
    >
      <SubCategory>
        <img src={imgSrc} />
        <p className="text-h3">{title}</p>
      </SubCategory>
    </CategoryBox>
  );
};

export default SmallCategory;
