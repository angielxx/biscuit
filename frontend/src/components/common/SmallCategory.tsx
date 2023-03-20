import { useNavigate } from "react-router";

// css
import tw, { styled } from "twin.macro";

// icons
import react from '../../assets/icons/subCategory.svg';

const SmallCateBox = styled.div`
  ${tw`flex flex-col items-start order-5 w-[298px] px-3 py-4 gap-[10px] text-white border-b border-solid border-dark-grey10`}
`

const SmallCate = styled.div`
  ${tw`flex items-center h-6 p-0 gap-[13px]`}
`

interface SmallProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: string[];
}

const SmallCategory = ({isOpen, setIsOpen, content}: SmallProps) => {
  const navigate = useNavigate();
  const isClicked = (item: string) => {
    navigate(`/contents/${item}`)
  }

  return (
    <>
      {content.map((item) => {
        return (
          <SmallCateBox>
            <SmallCate onClick={() => {(isOpen ? setIsOpen(false) : setIsOpen(true)); isClicked(item);}}>
              <img src={react}/>
              <p className='text-h3'>{item}</p>
            </SmallCate>
          </SmallCateBox>
        )
      })}
    </>
  )
}

export default SmallCategory;