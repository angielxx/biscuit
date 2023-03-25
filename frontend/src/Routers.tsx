import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Search from './pages/Search';
import Category from './pages/Category';

import { useRecoilState } from 'recoil';
import { isModalOpenState } from './recoils/Contents/Atoms';
import FeedbackModal from './components/common/Modal/FeedbackModal';

export default function Routers() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

  return (
    <div>
    {isModalOpen
      ? <FeedbackModal onClose={() => setIsModalOpen(false)}/>
      : null}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/category/:name" element={<Category />} />
      <Route path="admin" element={<Admin />} />
    </Routes>
    </div>
  );
}
