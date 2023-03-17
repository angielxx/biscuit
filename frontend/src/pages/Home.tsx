import { useRecoilValue } from "recoil"
import Button from "../components/common/Button";
import { functionToggleState } from "../recoils/FuntionToggle/Atoms"

export default function Home() {
  const functionToggle = useRecoilValue(functionToggleState);

  const clickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("클릭!")
  }

  return (
    <div>
      <h1>Home</h1>
      { functionToggle.homePageToggle ? <p>Toggle On</p> : <p>Toggle Off</p>}
      { functionToggle.buttonToggle ? <Button title="버튼" status="active" onClick={clickBtn}/> : null}
    </div>
  )
}
