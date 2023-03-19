import { useState, FormEvent } from "react";

// css
import tw, { styled } from 'twin.macro';

// icons
import dropdown from '../../assets/icons/arrow_drop_down.svg';
import SmallCategory from "./SmallCategory";

const CategoryBox = styled.div`
  ${tw`flex flex-col`}
`

const Category = styled.div`
  ${tw`flex justify-between items-center w-[298px] h-13 box-border px-3 py-4 text-white self-stretch border-b border-solid border-dark-evaluated`}
`

interface BigCategoryProps {
  isOpen: boolean;
  setIsOpen: any;
}

const BigCategory = ({isOpen, setIsOpen}: BigCategoryProps) => {
  const [isCategory, setIsCategory] = useState<boolean>(false);
  const [isKey, setIsKey] = useState<number>(0);

  const BigCategoryList = [
    { name: "FrontEnd" },
    { name: "BackEnd" },
    { name: "QA" }
  ];

  return (
    <CategoryBox>
      {BigCategoryList.map((category, index) => {
        return (
          <>
            <Category key={index}>
              <p className="text-h3">{category.name}</p>
              <img src={dropdown} alt="dropdown" key={index} onClick={() => {(isCategory ? setIsCategory(false) : setIsCategory(true)); setIsKey(index); }} />
            </Category>
          </>
        )
      })}
      {isCategory ? (
        <SmallCategory index={isKey} isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : null}
    </CategoryBox>
  )
}

export default BigCategory;
