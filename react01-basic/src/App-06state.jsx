/**
useState()
  : 리액트에서 ㅏㅇ태값을 가지는 state의 값을 변경하거나 초기값을 부여할때 사용하는 React Hook(훅)이다.
    이 함수의 반환값은 배열인데 0번요소는 state의 초기값을 저장하기 위한 변수이고 1번요소는 이 값을 변경할 
    수 있는 함수로 사용한다. 구조분해할당을 이용해서 좌측향의 배열로 각각 변수와 함수를 받아온다.
 */
import { useState } from 'react'
import FrontComp from './components/_FrontComp.jsx'
import BackComp from './components/_BackComp.jsx'

function App() {
  /**
  컴포넌트의 상태관리를 위한 state변수 생성. 변수명은 mode, 초기값은 both로 설정. 이 값을 위한 함수는 
  setMode()로 정의한다.
   */
  const [mode, setMode] = useState('both');

  /**
  내부 함수 정의. 매개변수로 전달된 값을 통해 상태변수를 변경하기 위한 setMode()를 호출한다. 
   */
  const handleSetMode = (mode) => {
    setMode(mode);
  };
  //컴포넌트 저장을 위한 변수 선언 
  let content = '';
  //상태변수 mode의 값에 따라 contents에는 다른 컴포넌트를 할당 
  if (mode === 'front') {
    //'front'일때는 FrontComp 컴포넌트를 할당 
    content = <>
      <FrontComp onSetMode={(mode)=>setMode(mode)} />;
    </>
  } 
  else if (mode === 'back') {
    content = <>
      <BackComp setMode={(setMode)=>setMode(setMode)} />
    </>
  }
  else {
    content = <>
      <FrontComp onSetMode={(mode)=>handleSetMode(mode)} />
      <BackComp setMode={handleSetMode} />
    </>;
  }
  return (
    <>
      <h2><a href="/" onClick={(event)=>{event.preventDefault(); setMode('both');}}>React-State</a></h2>
      <ol>
        {content}
      </ol>
    </>
  )
}

export default App

