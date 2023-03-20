import { useNavigate } from "react-router";

// css
import tw, { styled } from "twin.macro";

// icons
import react from '../../assets/icons/subCategory.svg';

const SmallCateBox = styled.div`
  ${tw`flex flex-col order-5 w-[298px] h-13`}
`

const SmallCate = styled.div`
  ${tw`flex items-center w-[298px] h-13 box-border px-3 py-4 text-white border-b border-solid border-dark-evaluated`}
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
    <div className="flex flex-col order-5">
      {content.map((item) => {
        return (
          <SmallCate onClick={() => {(isOpen ? setIsOpen(false) : setIsOpen(true)); isClicked(item);}}>
            <img src={react}/>
            <p className='text-h3'>{item}</p>
          </SmallCate>
        )
      })}
    </div>
  )
}

export default SmallCategory;