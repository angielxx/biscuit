import { useState } from "react";

// css
import tw, { styled } from 'twin.macro';

// icons
import dropdown from '../../assets/icons/arrow_drop_down.svg';
import SmallCategory from "./SmallCategory";

const CategoryBox = styled.div`
  ${tw`flex flex-col order-4`}
`

const Category = styled.div`
  ${tw`flex justify-between items-center w-[298px] h-13 box-border px-3 py-4 text-white flex-none self-stretch grow-0 order-4 border-b border-solid border-dark-evaluated`}
`

const BigCategory = () => {
  const [isCategory, setIsCategory] = useState<boolean>(false);

  return (
    <CategoryBox>
      <Category>
        <p className="text-h3">카테고리</p>
        <img src={dropdown} alt="dropdown" onClick={() => {isCategory ? setIsCategory(false) : setIsCategory(true); }} />
      </Category>
      {isCategory ? (
        <SmallCategory />
      ) : null}
    </CategoryBox>
  )
}

export default BigCategory;
