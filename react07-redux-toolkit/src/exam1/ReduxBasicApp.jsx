//리덕스에서 제공하는 2가지 훅 임포트 
import { useSelector, useDispatch } from 'react-redux';
//슬라이스에서 정의한 함수 임포트 
import { increment, decrement, reset } from './counterSlice';

/**
useSelector : 컴포넌트에서 스토어에 저장된 전역 상태값을 읽어오기 위한 훅
useDispatch : 상태 변경시 실행하는 함수를 생성하는 훅. 이 함수를 통해 액션을 전달하여 상태를 변경한다. 
 */
const ReduxBasicApp = () => {
  //스토어에 등록된 상태변수를 가져옴
  const countVal = useSelector((nowState) => nowState.myCounter.myValue);
  //디스패치 함수 선언 
  const dispatch = useDispatch();

  return (
    <>
      <h2>Redux 기본사용법</h2>
      {/* 상태변수 출력 */}
      <p>현재 값: {countVal}</p>
      {/* 각 함수를 버튼에 연결해서 실행. 디스패치 함수를 통해 리듀서를 호출해서 각 기능을 실행한다. */}
      <button onClick={() => dispatch(increment())}>증가</button>
      <button onClick={() => dispatch(decrement())}>감소</button>
      <button onClick={() => dispatch(reset())}>리셋</button>
    </>
  );
};

export default ReduxBasicApp;
