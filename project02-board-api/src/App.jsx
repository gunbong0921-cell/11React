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
      <Route path="/view/:idx" element={<View />} />
      <Route path="/edit/:idx" element={<Edit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
