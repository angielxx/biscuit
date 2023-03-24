import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import Routers from './Routers';
import Navbar from './components/common/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './styles/App.css';
// import { isModalOpenState } from './recoils/Contents/Atoms';
// import FeedbackModal from './components/common/Modal/FeedbackModal';

const queryClient = new QueryClient();

function App() {
  // const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BrowserRouter>
            <Navbar />
            <div className="mt-20">
              {/* {isModalOpen
                ? <FeedbackModal onClose={() => setIsModalOpen(false)}/>
                : null} */}
              <Routers />
            </div>
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
}

export default App;
