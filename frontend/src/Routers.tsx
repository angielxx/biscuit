import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Search from './pages/Search';

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="admin" element={<Admin />} />
    </Routes>
  );
}
