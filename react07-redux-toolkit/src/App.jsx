import { useState } from "react";

/**
부모 컴포넌트인 App에서 프롭스를 통해 자식 컴포넌트에 함수를 전달하고,
자식 컴포넌트에서 전달받은 함수를 실행하여 부모 컴포넌트의 상태를 변경하는 방식으로 데이터를 전달.
 */
const Right1 = (props) => {
  return (
  <div>
    <h2>Right1</h2>
    {/* App에서 전달받은 onMyPlus1 함수를 실행하여 onMyPlus2 함수를 전달 */}
    <Right2 onMyPlus2={() => {props.onMyPlus1()}}></Right2>
  </div>
  );
}

const Right2 = (props) => {
  return (
    <div>
      <h2>Right2</h2>
      <Right3 onMyPlus3={() => {props.onMyPlus2();}}></Right3>
    </div>
  );
}

const Right3 = (props) => {
  return (
    <div>
      <h2>Right3</h2>
      {/* Right의 최하위 컴포넌트에서는 Click 이벤트 핸들러를 실행하여 onMyPlus3 함수를 실행
      그러면 Right3>Right2>Right1>App 순서로 함수가 실행되면서 상태변수의 값이 변경됨. */}
      <input type="button" value="+" onClick={() => {props.onMyPlus3();}}></input>
    </div>
  );
}

/**
Left 컴포넌트의 경우에는 상태변수를 하위로 전달한다.
 */
const Left1 = (props) => {
  return (
    <div>
      <h2>Left1 : {props.number1}</h2>
      <Left2 number2={props.number1}></Left2>
    </div>
  );
}

const Left2 = (props) => {
  return (
    <div>
      <h2>Left2 : {props.number2}</h2>
      <Left3 number3={props.number2}></Left3>
    </div>
  );
}

const Left3 = (props) => {
  return (
    <div>
      {/* Left 최하위 컴포넌트에서는 프롭스로 전달받은 값을 출력한다. */}
      <h2>Left3 : {props.number3}</h2>
    </div>
  );
}

function App() {
  //최상위 컴포넌트에서 상태변수 생성 
  const [number, setNumber] = useState(1);
  return (
    <>
      <div className="root">
        {/* 상태변수의 값을 표시 */}
        <h2>React - Redux : {number}</h2>
        <div id="grid">
          {/* Left1 컴포넌트에 number 상태변수의 값을 전달 */}
          <Left1 number1={number}></Left1>
          {/* Right1 컴포넌트에 onMyPlus1 함수를 전달 */}
          <Right1 onMyPlus1={() => {setNumber(number + 1);}}></Right1>
        </div>
      </div>
    </> 
  );
}

export default App;