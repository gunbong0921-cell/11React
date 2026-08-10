import { useRef, useState } from 'react';

/**
useRef()
  : 컴포넌트 리렌더링과 무관하게 값을 유지하는 훅.
    DOM 요소에 직접 접근하거나, 변경돼도 화면을 다시 그리지 않는 값을 저장할 때 사용한다.
 */
const UseRefExam1 = () => {
  const [stateNum, setStateNum] = useState(0);
  // 리렌더링이 되어도 값이 유지되고, 값이 바뀌어도 리렌더링을 유발하지 않음
  const refNum = useRef(0);
  let myNum = 0;

  const plusState = () => {
    setStateNum(stateNum + 1);
    console.log('State증가', stateNum);
  };

  const plusRef = () => {
    refNum.current = refNum.current + 1;
    console.log('Ref증가', refNum.current);
  };

  const plusMyNum = () => {
    console.log('일반변수증가', ++myNum);
  };

  return (
    <>
    <div>
      <h2>useRef 사용하기1</h2>
      <p>State: {stateNum}</p>
      <p>Ref: {refNum.current}</p>
      <p>myNum: {myNum}</p>
      <button onClick={plusState}>State 증가</button>
      <button onClick={plusRef}>Ref 증가</button>
      <button onClick={plusMyNum}>MyNum 증가</button>
    </div>
    </>
  );
}

export default UseRefExam1;
