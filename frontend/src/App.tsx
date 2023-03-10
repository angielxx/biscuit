import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Routers from "./Routers";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          {/* <NavBar /> */}
          <Routers />
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
