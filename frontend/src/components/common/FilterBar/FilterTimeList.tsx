import tw, { styled, TwStyle } from 'twin.macro';
import FilterTimeItem from './FilterTimeItem';

type ItemObj = {
  id: number;
  content: string;
};

interface FilterTimeProps {
  itemList: ItemObj[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterTimeListContainer = tw.div`
  relative z-10 w-full rounded-[10px] flex flex-col justify-center items-center mt-1 p-2 bg-black border-[1px] border-primary
`;

const FilterTimeList = ({
  itemList,
  setSelected,
  setIsClicked,
}: FilterTimeProps) => {
  return (
    <FilterTimeListContainer>
      {itemList?.map((item: ItemObj) => {
        return (
          <FilterTimeItem
            key={item.id}
            content={item.content}
            setSelected={setSelected}
            setIsClicked={setIsClicked}
          />
        );
      })}
    </FilterTimeListContainer>
  );
};

export default FilterTimeList;
