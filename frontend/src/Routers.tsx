import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Search from './pages/Search';
import Category from './pages/Category';

import { useRecoilState } from 'recoil';
import { isModalOpenState } from './recoils/Contents/Atoms';
import RecentContentModal from './components/common/Modal/RecontContentModal';
import Modal from './components/common/Modal/Modal';
import { isStartModalState } from './recoils/Start/Atoms';
import Start from './components/Start/Start';
import GoogleLogin from './components/Start/GoogleLogin';

export default function Routers() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const [isStartModalOpen, setIsStartModalOpen] = useRecoilState(isStartModalState);

  return (
    <div>
      {isModalOpen ? (
        <Modal
          onClose={() => setIsModalOpen(false)}
          content={<RecentContentModal onClose={() => setIsModalOpen(false)} />}
        />
      ) : null}
      {isStartModalOpen ? (
        <Modal
          onClose={() => setIsStartModalOpen(false)}
          content={<Start />}
        />
      ) : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="admin" element={<Admin />} />
        <Route path="/login/oauth2/code/google" element={<GoogleLogin />} />
      </Routes>
    </div>
  );
}
