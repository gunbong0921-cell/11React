import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import TopNavi from './components/TopNavi';
import NotFound from './components/NotFound';
import CommonLayout from './components/CommonLayout';
import LayoutIndex from './components/LayoutIndex';
import RouterHooks from './components/RouterHooks';

function App() {

  return (
    <>
    {/* 라우팅 처리가 필요없는 컴포넌트 전체페이지에서 공통으로 렌더링되는 네비게이션
    을 주로 사용한다. */}
    <TopNavi></TopNavi>
    {/* 라우팅 처리가 필요한 컴포넌트는 아래와 같이 path 속성을 통해 경로를 지정하고 element 속성을 
    통해 컴포넌트를 지정한다. */} 
    <Routes>
      {/* 최초 앱을 실행한 상태에 렌더링 할 Home 컴포넌트 */}
      <Route path="/" element={<Home />} />
        <Route path="/intro" element={<CommonLayout />}>
        <Route index element={<LayoutIndex />} />
        <Route path="router" element={<RouterHooks />} />
      </Route>
      {/* 앞에서 지정되지 않은 모든 요청명에 대해 404 처리 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
  );
}

export default App