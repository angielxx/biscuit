import { useRecoilState, useRecoilValue } from "recoil"
import Button from "../components/common/Button";
import DropDown from "../components/common/DropDown/DropDown";
import FilterBar from "../components/common/FilterBar/FilterBar";
import { functionToggleState } from "../recoils/FuntionToggle/Atoms"
import { homeFilterBtnState, homeFilterTimeState } from "../recoils/Home/Atoms";

export default function Home() {
  const functionToggle = useRecoilValue(functionToggleState);

  const clickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("클릭!")
  }

  const dropDownList = [
    { id: 1, content: "Frontend" },
    { id: 2, content: "Backend" },
    { id: 3, content: "DevOps" },
  ]

  const [filterBtnState, setFilterBtnState] = useRecoilState(homeFilterBtnState);
  const [filterTimeState, setFilterTimeState] = useRecoilState(homeFilterTimeState);

  return (
    <div>
      <h1>Home</h1>
      { functionToggle.homePageToggle ? <p>Toggle On</p> : <p>Toggle Off</p>}
      { functionToggle.buttonToggle ? <Button title="퀴즈 풀래요" status="active" onClick={clickBtn}/> : null}
      { functionToggle.dropDownToggle ? <DropDown itemList={dropDownList} placeHolder="직무 선택" /> : null}
      { functionToggle.filterBarToggle
        ? <FilterBar 
          filterBtnState={filterBtnState}
          setFilterBtnState={setFilterBtnState}
          filterTimeState={filterTimeState}
          setFilterTimeState={setFilterTimeState}
        />
        : null}
    </div>
  )
}
