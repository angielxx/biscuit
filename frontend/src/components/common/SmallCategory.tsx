import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";

const SmallCate = styled.div`
  ${tw`flex items-center w-[298px] h-13 box-border px-3 py-4 text-white border-b border-solid border-dark-evaluated`}
`

const SmallCateList = [
  { name: ["React", "JavaScript", "TypeScript"] },
  { name: ["Spring", "Django"] },
  { name: ["QA"] }
];

interface SmallProps {
  index: number;
  isOpen: boolean;
  setIsOpen: any;
}

const SmallCategory = ({index, isOpen, setIsOpen}: SmallProps) => {
  // const navigate = useNavigate();

  return (
    <div className="flex flex-col order-5">
      {SmallCateList[index].name.map((category, idx) => {
        return (
          <Link to={`/contents/${category}`}>
            <SmallCate onClick={() => {(isOpen ? setIsOpen(false) : setIsOpen(true));}}>
              <img />
              <p className='text-h3'>{category}</p>
            </SmallCate>
          </Link>
        )
      })}
    </div>
  )
}

export default SmallCategory;