import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CategoryPage from "./pages/Category";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="admin" element={ <Admin /> } />
      <Route path="/contents/:category" element={ <CategoryPage /> } />
    </Routes>
  )
}
