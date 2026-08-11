import { useReducer, useState } from 'react';

/**
useReducer
  : useState와 동일하게 상태를 관리하기 위한 훅. 단 상태(state)와 이를 변경하기 위한 
  리듀서(reducer)를 분리해서 관리할 수 있다. 특히 액션을 기반으로 상태를 변경하는 경우 유용하다.
  형식]
  const [state(상태변수), dispatch(디스패치함수)] = useReducer(reducer(리듀서함수), initialState(초기상태));
  ※상태변경을 위해 디스패치 함수를 호출하면 리듀서 함수를 통해 상태를 변경하게된다.
 */

/**
리듀서 함수 정의. 매개변수로는 현재상태와 상태변경을 위한 액션객체를 받을 수 있도록 정의한다.   
 */  
const bankReducer = (bankState, bankAction) => {
  console.log('리듀서호출', bankState, bankAction);
  //액션객체의 mode의 값을 통해 분기 
  switch (bankAction.mode) {
    //입금처리
    case 'deposit':
      return bankState + bankAction.amount;
    //출금처리
    case 'withdraw':
      return bankState - bankAction.amount;
    //잔액조회(현재의 상태를 그대로 반환) 
    default:
      return bankState;
  }
};

//UI 담당 컴포넌트 
const UseReducerExam = () => {
  //입/출금액 변경을 위한 상태변수. input태그에 적용되어 있음. 
  const [inputMoney, setInputMoney] = useState(0);
  /**
  useReducer 훅을 통한 상태변수 선언. 변수명은 balance, 초기값은 0. 상태변경을 위해 bankDispatch라는 함수를
  호출하면, 내부적으로 bankReducer() 함수를 통해 상태가 변경된다. 
   */
  const [balance, bankDispatch] = useReducer(bankReducer, 0);
  return (
    <>
    <h2>useReducer 사용하기</h2>
    {/* useReducer 훅을 통해 관리하는 상태변수를 출력 */}
    <p>잔고 : {balance}원</p>
    {/* 스핀박스를 눌러 금액을 1000원 단위로 변경할 수 있도록 설정. 금액의 변경이 있을때마다 state변수 inputMoney에 반영된다. */}
    <input type="number" value={inputMoney} step={1000} onChange={(e) => setInputMoney(parseInt(e.target.value))} />
    {/* 앞에서 입력한 금액을 아래 버튼을 눌러 입금/출금 처리할 수 있다. 상태변경을 위해 디스패치 함수를 호출하고,
    이때 인수로 액션객체를 전달하면, 리듀서 함수를 통해 상태가 변경된다. */}
    {/* 입금버튼. 입금버튼과 동일하게 디스패치 함수를 호출하고, 액션객체를 전달한다. */}
    <button type="button" onClick={() => bankDispatch({ mode: 'deposit', amount: inputMoney })}>입금</button>
    <button type="button" onClick={() => bankDispatch({ mode: 'withdraw', amount: inputMoney })}>출금</button>
    </>
  );
}

export default UseReducerExam;