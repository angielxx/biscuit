// css
import tw, { styled } from 'twin.macro';

// icons
import dropdown from '../../assets/icons/arrow_drop_down.svg';
import SmallCategory from './SmallCategory';

const CategoryBox = styled.div`
  ${tw`flex flex-col`}
`

const Category = styled.div`
  ${tw`flex justify-between items-center w-[298px] h-13 box-border px-3 py-4 text-white self-stretch border-b border-solid border-dark-evaluated`}
`

type Content = {
  id: number;
  subName: string;
}

interface BigCategoryProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCategory: boolean;
  title: string;
  content: Content[];
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const BigCategory = ({setIsOpen, isCategory, title, content, onClick}: BigCategoryProps) => {

  return (
    <CategoryBox onClick={onClick}>
      <Category>
        <p className="text-h3">{title}</p>
        <img src={dropdown} alt="dropdown" />
      </Category>
      {isCategory ? (
        <SmallCategory setIsOpen={setIsOpen} content={content} />
      ) : null}
    </CategoryBox>
  )
}

export default BigCategory;
