import { useRef, useState } from 'react';

/**
useRef()
  : 컴포넌트 리렌더링과 무관하게 값을 유지하는 훅.
    DOM 요소에 직접 접근하거나, 변경돼도 화면을 다시 그리지 않는 값을 저장할 때 사용한다.
    useState와 같이 값은 마음대로 변경할 수 있지만, 값이 변경될때 리랜더링은 되지 않는다.
    또한, JavaScript의 getElementById()와 같이 DOM요소에 접근할 때 사용된다.
 */
const UseRefExam1 = () => {
  //state 변수 생성. 화면의 리랜더링을 위해 정의 
  const [stateNum, setStateNum] = useState(0);
  //ref 변수 생성. 
  const refNum = useRef(0);
  //일반변수 생성, 
  let myNum = 0;
  //위 모든 변수는 0으로 초기화 

  const plusState = () => {
    setStateNum(stateNum + 1);
    console.log('State증가', stateNum);
  };

  const plusRef = () => {
    /**
    refNum.current는 현재 0이므로, 1이 된다.
     */
    refNum.current = refNum.current + 1;
    console.log('Ref증가', refNum.current);
  };
  //일반변수 증가
  const plusMyNum = () => {
    console.log('일반변수증가', ++myNum);
  };

  /**
  state를 변경시키면 그때마다 화면이 새롭게 랜더링된다. 즉 화면에 변화가 생긴다. 랜더링은 컴포넌트로
  정의된 함수를 호출하여 재실행하는 의미이므로 일반변수의 경우에는 설정된 값으로 초기화된다. 따라서 
  컴포넌트의 생명주기안에서 값을 유짛고 시팓면 state나 ref를 사용하는 것이 좋다. 그렇지 않으면
  일반변수를 사용하면 된다. 
   */
  return (
    <>     
    <h2>useRef 사용하기1</h2>
    <div>
      {/* 각 변수의 값을 화면에 출력 */}
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
