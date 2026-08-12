import {Routes, Route} from "react-router-dom";
import TopNavi from './components/TopNavi';

// Redux의 기본적인 사용법을 학습하기 위한 앱 
// 프로바이더 컴포넌트는 redux로 부터 임포트한다. 
import { Provider as BasicProvider } from 'react-redux';
// 스토어 컴포넌트는 개발자가 직접 제작한다. 
import { store as basicStore } from './exam1/store';
import ReduxBasicApp from './exam1/ReduxBasicApp';

// 할일관리(Todo) 앱 임포트 
// import { Provider as TodoProvider } from 'react-redux';
// import { store as todoStore } from './exam2/store';
// import TodoApp from './exam2/TodoApp';

function App() {
  return (<>
    <TopNavi></TopNavi>
    <Routes> 
      {/* 프로바이더 컴포넌트가 기본앱 컴포넌트를 감싸고 있고, 
      스토어를 공유하는 형식으로 처리  */}
      <Route path='/' element={
        <BasicProvider store={basicStore}>
          <ReduxBasicApp />
        </BasicProvider>} />
      <Route path='/ReduxBasicApp' element={
        <BasicProvider store={basicStore}>
          <ReduxBasicApp />
        </BasicProvider>} />
     {/* <Route path='/TodoApp' element={
        <TodoProvider store={todoStore}>
          <TodoApp />
        </TodoProvider>} /> */}
    </Routes>
  </>)
}

export default App;
