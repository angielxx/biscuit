import { useNavigate } from "react-router";

// css
import tw, { styled } from "twin.macro";

// icons
import react from '../../assets/icons/subCategory.svg';

const CategoryBox = styled.div`
  ${tw`flex flex-col items-start order-5 w-[298px] px-3 py-4 gap-[10px] text-white border-b border-solid border-dark-grey10`}
`

const SmallCate = styled.div`
  ${tw`flex items-center h-6 p-0 gap-[13px]`}
`

type Content = {
  id: number;
  subName: string;
}

interface SmallProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: Content[];
}

const SmallCategory = ({setIsOpen, content}: SmallProps) => {
  const navigate = useNavigate();
  const isClicked = (item: string) => {
    navigate(`/contents/${item}`);
    setIsOpen(false);
  }

  return (
    <>
      {content.map((item, index) => {
        return (
          <CategoryBox key={index} onClick={() => {isClicked(item.subName);}}>
            <SmallCate>
              <img src={react}/>
              <p className='text-h3'>{item.subName}</p>
            </SmallCate>
          </CategoryBox>
        )
      })}
    </>
  )
}

export default SmallCategory;