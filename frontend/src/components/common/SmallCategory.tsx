// css
import tw, { styled } from 'twin.macro';

// icons

const Category = ({ category }: { category: string }) => {
  return <img src={`/src/assets/icons/category/${category}.svg`} />;
};

const CategoryBox = styled.div`
  ${tw`flex flex-col items-start order-5 w-full px-4 py-3 gap-[10px] text-white border-b border-solid border-dark-grey10`}
`;

const SubCategory = styled.div`
  ${tw`flex items-center h-fit p-0 gap-[13px]`}
`;

interface SmallProps {
  isClick?: React.MouseEventHandler<HTMLDivElement>;
  title: string;
}

const SmallCategory = ({ isClick, title }: SmallProps) => {
  return (
    <CategoryBox onClick={isClick}>
      <SubCategory>
        <Category category={title} />
        <p className="text-h3">{title}</p>
      </SubCategory>
    </CategoryBox>
  );
};

export default SmallCategory;
