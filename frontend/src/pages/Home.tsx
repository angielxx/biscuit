import { useRecoilValue } from 'recoil';
import { functionToggleState } from '../recoils/FuntionToggle/Atoms';
import Button from '../components/common/Button';

import Modal from '../components/common/Modal';

export default function Home() {
  const functionToggle = useRecoilValue(functionToggleState);

  const clickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('클릭!');
  };

  return (
    <div>
      <h1>Home</h1>
      <Modal />
      {functionToggle.buttonToggle ? (
        <Button title="버튼" status="active" onClick={clickBtn} />
      ) : null}
      {functionToggle.homePageToggle ? <p>Toggle On</p> : <p>Toggle Off</p>}
    </div>
  );
}
