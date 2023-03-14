import { useRecoilValue } from 'recoil';
import { functionToggleState } from '../recoils/FuntionToggle/Atoms';

// 컴포넌트 확인용 임시
import Modal from '../components/common/Modal';

export default function Home() {
  const functionToggle = useRecoilValue(functionToggleState);

  return (
    <div>
      <h1>Home</h1>
      <Modal />
      {functionToggle.homePageToggle ? <p>Toggle On</p> : <p>Toggle Off</p>}
    </div>
  );
}
