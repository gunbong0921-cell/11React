/**
모둘화 한 컴포넌틀르 임포트한다. 경로와 파일명까짐나 작성하면되고 확장자는 별도로 추가하지 않는다. 
그리고 export할때 사용했던 이름으로 import해준다. 
 */
import FrontComp from './components/_FrontComp.jsx'
import BackComp from './components/_BackComp.jsx'

function App() {
  return (<>
    <h2>React-Modules</h2>
    <ol>
      <FrontComp onMyEvent1={()=>{alert('프론트엔드 클릭됨(부모전달)');}}></FrontComp>
      <BackComp onMyEvent2={(msg)=>{alert(msg);}}/>
    </ol>
  </>)
}

export default App

