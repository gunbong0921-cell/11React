import { Routes, Route } from 'react-router-dom'

import List from './components/board/list'
import Write from './components/board/write'
import View from './components/board/view'
import Edit from './components/board/Edit'
import NotFound from './components/common/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/list" element={<List />} />
      <Route path="/write" element={<Write />} />
      {/* 중첩라우팅으로 게시물의 일련번호가 하위 경로로 추가된다. 이 값은 useParams() 훅을 통해 읽어올 수 있다.
      'view/99'와 같은 형태로 요청되면 :idX에 99가 저장되는 형식이다. */}
      <Route path="/view/:idx" element={<View />} />
      {/* VIEW와 동일하게 라우팅 처리 방식을 적용한다. */}
      <Route path="/edit/:idx" element={<Edit />} />
      {/* 설정된 url(요청명)이 아닌 경우 404처리 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
