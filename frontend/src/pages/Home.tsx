import { useRecoilValue } from "recoil"
import { functionToggleState } from "../recoils/FuntionToggle/Atoms"

export default function Home() {
  const functionToggle = useRecoilValue(functionToggleState);

  return (
    <div>
      <h1>Home</h1>
      { functionToggle.homePageToggle ? <p>Toggle On</p> : <p>Toggle Off</p>}
    </div>
  )
}
