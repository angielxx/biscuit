import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Search from './pages/Search';
import Category from './pages/Category';
import Test from './pages/Test';

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/category/:name" element={<Category />} />
      <Route path="admin" element={<Admin />} />

      <Route path="/test" element={<Test />} />

    </Routes>
  );
}
