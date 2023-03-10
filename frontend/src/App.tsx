import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Routers from "./Routers";
import Navbar from "./components/common/Navbar";

import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Navbar />
          <Routers />
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
