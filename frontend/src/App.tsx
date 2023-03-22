import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Routers from "./Routers";
import Navbar from "./components/common/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";

import "./styles/App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BrowserRouter>
            <Navbar />
            <Routers />
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
}

export default App;
