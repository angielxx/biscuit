import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import Routers from './Routers';
import Navbar from './components/common/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './styles/App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BrowserRouter>
            <Navbar />
            <div className="mt-20">
              <Routers />
            </div>
          </BrowserRouter>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
