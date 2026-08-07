import { Routes, Route } from 'react-router-dom';

import TopNavi from './components/TopNavi';
import Lifecycle from './components/Lifecycle';
//import LocalJsonFetcher from './components/LocalJsonFetcher';
//import ExternalJsonFetcher from './components/ExternalJsonFetcher';

function App() {

  return (<>
    <TopNavi />
    <Routes>
      <Route path="/" element={<Lifecycle />} />
      {/* <Route path="/local" element={<LocalJsonFetcher />} /> */}
      {/* <Route path="/external" element={<ExternalJsonFetcher />} /> */}
    </Routes>
    </>)
}

export default App

