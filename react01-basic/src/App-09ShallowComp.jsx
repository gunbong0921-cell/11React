import {useState} from 'react';

/**
얇은비교(shallow comparison)
  : React에서는 상태(State)변수가 객체, 배열과 같이 참조형인 경우 속성값 자체를 비교하지 않고, 
  객체의 참조값만 비교해서 변화를 감지한다. 객체의 모든 속성을 비교하는 '깊은비교'는 객체의 크기가 
  커질수록 성능의 문제가 발생할 수 있으므로 사용하지 않는다.
 */
const TopComp = ({MyData})=>{
  return (
    <>
      <ol>
        <li>프론트엔드</li>
        {/* 프롭스로 전달된 MyData는 객체형 배열이므로 각 key값을 사용해서 접근할 수 있는 배열요소의 크기만큼
        반복해서 고차함수인 map이 실행된다.
        <li> 캐그를 반호나해서 새로운 배열이 생성되므로 화면상에는 요소들이 목록처럼 출력되게 된다. */}
        <ul>
          {MyData.front.map((item, i)=> <li key={i}>{item}</li>)}
        </ul>
        <li>백엔드</li>
        <ul>
          {MyData.back.map((item, i)=> <li key={i}>{item}</li>)}
        </ul>
      </ol>
    </>
  )
}

function App() {
  //스테이트 변수 생성. 초기값은 배열을 포함한 객체형식으로 정의됨. 
  const [MyData, setMyData] = useState({
    front: ['HTML5', 'CSS3', 'JavaScript', 'jQuery'],
    back: ['Java', 'Oracle', 'JSP', 'Spring Boot'],
  });
  //MyData의 front 항목을 배열에 요소를 추가하는 함수 
  const addFront = ()=>{
    //해당 배열의 끝에 'React' 문자열 추가 
    MyData.front.push('React');
    //값의 추가를 콘솔창에서 확인 
    setMyData(MyData);
    //스테이트 변경 함수를 실행 
    /**
    스테이트가 변경되면 UI가 리랜더링 되어애 하지만, 이 경우에는 화면이 변하지 않는다. 
    상태변수인 mydata의 참조값에 대한 변화가 없으므로 React는 변화를 감지하지 못하기 때문이다. 
     */
  }
  //back 항목에 요소를 추가하는 함수 
  const addBack = ()=>{
    //back 배열을 복사해서 가져온 후 'Node.js'룰 추가한 배열을 생성 
    const newBack = [...MyData.back, 'Node.js'];
    //MyyData 객체의 복사본을 만든 후, back 속성값을 새로운 배열로 변경 
    const newMyData = {...MyData, back: newBack};
    //스테이트 변경 함수를 실행 
    setMyData(newMyData);
    /**
    MyData의 복사본을 생성한 후 값을 변경하게 되므로 React는 변화를 감지하게된다. 즉 새로운 
    참조값이 부여된 상태이므로 이 경우에는 새롭게 랜더링이 된다. 
     */
  }
  return (
    <>
      <h2>React-shallow Comparison</h2>
      <TopComp MyData={MyData}/>
      <button type="button" onClick={addFront}>프론트엔드 추가</button>
      <button type="button" onClick={addBack}>백엔드 추가</button> 
    </>
  )
}

export default App

