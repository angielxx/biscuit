import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Search from './pages/Search';
import Category from './pages/Category';

import { useRecoilState } from 'recoil';
import { isModalOpenState } from './recoils/Contents/Atoms';
import RecentContentModal from './components/common/Modal/RecontContentModal';
import Modal from './components/common/Modal/Modal';
import OnBoarding from './pages/OnBoarding';

export default function Routers() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

  return (
    <div>
      {isModalOpen ? (
        <Modal
          onClose={() => setIsModalOpen(false)}
          content={<RecentContentModal onClose={() => setIsModalOpen(false)} />}
        />
      ) : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="admin" element={<Admin />} />
        <Route path="/onboarding" element={<OnBoarding />} />
      </Routes>
    </div>
  );
}