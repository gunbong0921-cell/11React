import { Routes, Route } from "react-router-dom";
import TopNavi from "./components/TopNavi";
import FileUpload from "./storages/FileUpload";
import FileLists from "./storages/FileLists";

const Home = () => <h2>Firebase Storage 예제</h2>;

function App() {
  return (
    <>
      <TopNavi />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<FileUpload />} />
        {/* 파일목록을 랜더링하기 위한 라우팅 처리 부분 */}
        <Route path="/filelists">
        {/* 경로 형식의 파라미터가 없는 경우에는 최상위 root 경로의 파일목록을 출력하고, 파라미터가 있는
        경우에는 하위 경로의 파일목록을 출력하는 기능을 구현한다. 즉 파라미터 유무에 상관없이 모두 FileLists 
        컴포넌트를 랜더링한다. */}
          <Route index element={<FileLists />} />
          <Route path=":path" element={<FileLists />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
