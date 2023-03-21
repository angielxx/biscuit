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
  mainName: string;
  subCategories: {
    id: number;
    subName: string;
  }[]
}

type ClickHanlder = (item: string) => void;

interface BigCategoryProps {
  // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: Content;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isClicked: ClickHanlder;
  isCategory: boolean;
}

// 한별 수정
const BigCategory = ({item, onClick, isClicked, isCategory}: BigCategoryProps) => {
// const BigCategory = ({title, onClick}: BigCategoryProps) => {

  return (
    <CategoryBox onClick={onClick}>
      <Category>
        <p className="text-h3">{item.mainName}</p>
        <img src={dropdown} alt="dropdown" />
      </Category>
      {isCategory ? (
        <>
          {item.subCategories.map((content, idx) => {
            return (
              <SmallCategory 
                key={idx} 
                // setIsOpen={setIsOpen} 
                isClick={() => isClicked(content.subName)} title={content.subName} />
            )
          })}
        </>
      ) : null}
    </CategoryBox>
  )
}

export default BigCategory;
