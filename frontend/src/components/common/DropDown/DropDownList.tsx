import DropDownItem from "./DropDownItem";
import tw, { styled, TwStyle } from 'twin.macro';

type ItemObj = {
  id: number,
  content: string,
}

interface DropDownListProps {
  itemList: ItemObj[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDownListContainer = tw.div`
  absolute z-10 w-full rounded-10 flex flex-col justify-center items-center p-4 bg-dark-grey20 mt-1
`

const DropDownList = ({itemList, setSelected, setIsClicked}: DropDownListProps) => {
  return (
    <DropDownListContainer>
      {itemList?.map((item) => {
        return (
          <DropDownItem 
            key={item.id} 
            content={item.content} 
            setSelected={setSelected} 
            setIsClicked={setIsClicked} 
          />
        )
      })}
    </DropDownListContainer>
  )
}

export default DropDownList;