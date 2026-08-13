import useCounterStore from './useCounterStore';

function ZustandBasicApp(){
  //상태저장소에서 필요한 변수와 함수를 구조분해해서 가져온다. 
  const {count, increment, decrement, reset} = useCounterStore();

  return (
    <>
    <h2>Zustand 기본사용법</h2>
    {/* 상태변수 출력 */}
    <p>현재 값: {count}</p>
    {/* 상태 변경을 위한 함수 호출 */}
    <button onClick={increment}>+1증가</button>
    <button onClick={decrement}>-1감소</button>
    <button onClick={reset}>초기화</button>
    </>
  )
}

export default ZustandBasicApp;