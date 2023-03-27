import { useRecoilState } from "recoil"
import { functionToggleState } from "../recoils/FuntionToggle/Atoms"

export default function Admin() {
  const [functionToggle, setFunctionToggle] = useRecoilState(functionToggleState);

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetId: string = e.target.id;
    const newFunctionToggle = {...functionToggle};
    newFunctionToggle[targetId] = !(functionToggle[targetId]);
    setFunctionToggle(newFunctionToggle);
  }

  return (
    <div>
      <h1>Admin Page</h1>
      {functionToggle ? Object.entries(functionToggle).map(([key, value]: [string, any]) => {
        return (
          <div key={ key }>
            <span>{ key }</span>
            <input 
              type="checkbox" 
              name={key} 
              id={key} 
              checked={value}
              onChange={(e) => handleToggleChange(e)}
            />
          </div>
        )
      }) : null }
    </div>
  )
}