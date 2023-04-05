import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Search from './pages/Search';
import Category from './pages/Category';

import { useRecoilState, useRecoilValue } from 'recoil';
import { isModalOpenState } from './recoils/Contents/Atoms';
import RecentContentModal from './components/common/Modal/RecontContentModal';
import Modal from './components/common/Modal/Modal';
import OnBoarding from './pages/OnBoarding';
import { isOnboardingState, isStartModalState } from './recoils/Start/Atoms';
import Start from './components/Start/Start';
import SocialLogin from './components/Start/SocialLogin';
import MyPage from './pages/MyPage';
import MyStore from './pages/MyStore';
import EditProfile from './pages/EditProfile';

export default function Routers() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const [isStartModalOpen, setIsStartModalOpen] =
    useRecoilState(isStartModalState);
  const onboardingState = useRecoilValue(isOnboardingState);

  return (
    <div>
      {isModalOpen ? (
        <Modal
          onClose={() => setIsModalOpen(false)}
          content={<RecentContentModal onClose={() => setIsModalOpen(false)} />}
          isOnboarding={false}
        />
      ) : null}
      {isStartModalOpen ? (
        <Modal 
          onClose={() => setIsStartModalOpen(false)} 
          content={<Start />} 
          isOnboarding={true}
        />
      ) : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/myStore" element={<MyStore />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/admin" element={<Admin />} />
        {!onboardingState
          ? <Route path="/onboarding" element={<OnBoarding />} />
          : null
        }
        <Route path="/signin" element={<SocialLogin />} />
      </Routes>
    </div>
  );
}
