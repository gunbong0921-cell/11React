import { useState, useEffect } from "react";

/**
useState()
  : 함수형 컴포넌트에서 LifeCycle(수명주기)를 사용하기 위한 Hokks로 컴포넌트 내부에서 발생하는
  데이터 가져오기, 구독설정, DOM조작 등과 같은 작업을 수행한다. 컴포넌트가 랜더링된 후 실행할
  코드를 정의하고, 컴포넌트가 언마운트될 때 실행할 코드를 정의한다. 
 */

/**
컴포넌트가 랜더링 되는것은 해당 함수가 호출되어 내부 코드가 실행된다는 의미이다. 함수의 실행에 의해 컴포넌트는
 화면상에 랜더링된다.   
 */  
function MoveBox(props) {
  /**
  이 컴포넌트에서 제일 먼저 실행되는 코드. 즉 랜더링 때에 실행할 코드가 있다면 이 부분에 작성한다.
   */
  console.log('Lifecycle==>1. 컴포넌트 실행(함수 호출)');
  
  //상태변수 생성. 프롭스로 전달받은 50으로 초기화.
  const [position, setPosition] = useState({ x: props.initPosition });
  //좌측이동 횟수 표현을 위한 상태변수 생성.
  const [leftCount, setLeftCount] = useState(1);
  /**
  박스에 지정할 스타일을 객체로 정의. Left속성을 통해 박스를 이동시킬 것이므로 position속성은 relative로 지정.
   */
  const boxStyle = {
    backgroundColor: 'red',
    position: 'relative',
    textAlign: 'center',
    width: '100px',
    height: '100px',
    margin: '10px',
    lineHeight: '100px',
    left: `${position.x}px`
  }; //최초 left는 50으로 초기화 됨. 

  //박스를 좌.우측으로 이동하기 위한 함수. 상태변수 position의 값을 증감시킨다.
  const moveLeft = () => {
    //함수 실행시 상태값이 변경되면 리랜더링됨.
    setPosition((prev) => ({ x: prev.x - 20 }));
    //좌측이동 상태값을 1 증가 
    setLeftCount((prev) => prev + 1);
  };

  const moveRight = () => {
    setPosition((prev) => ({ x: prev.x + 20 }));
  };
  /**
  이 컴포넌트가 랭더링 된 후 실행된다. 첫 실행에서는 마운트만 되고, 두번째 실행부터 언마운트,
  마운트순으로 실행된다.
   */
  useEffect(() => {
    console.log('useEffect==>3. 컴포넌트 마운트');
    return () => {
      console.log('useEffect==>4. 컴포넌트 언마운트');
    }
  }); //1.의존성 배열 생략
  // }, []); //2.의존성 배열 빈 배열 지정
  // }, [leftCount]); //3.의존성 배열에 State 변수 할당
  /**
  의존성 배열에 상태변수가 있으면 상태변수의 값이 변경될 때마다 실행된다. 
  1. 2개의 버튼을 누를때마다 useEffect()가 재실행된다. 
  2. 최초 실행시에만 useEffect()가 실행된다. 그 이후에는 재실행되지 않는다. 
  3. leftCount 상태변수의 값이 변경될 때마다 useEffect()가 재실행된다. 우측 이동 버튼을
    누를때에는 실행되지 않는다.  
   */

  /**
  앞에서 useEffect()가 먼저 선언되엇지만, 수명주기에서는 랜더링이 먼저 수행된다. 즉 화면에 UI가
  먼저 표시된 후 useEffect()가 실행된다. 
   */
  console.log('return실행==>2. 랜더링(return문)');
  return (
    <div>
      <h4>함수형 컴포넌트의 수명주기</h4>
      {/* <div>태그 안에 작성된 코드가 화면에 표시된다.가운데는 leftCount 상태변수 값이 표시된다. */}
        <div style={boxStyle}>{leftCount}</div>
        <input type="button" value="좌측이동" onClick={moveLeft} />
        <input type="button" value="우측이동" onClick={moveRight} />
    </div>
  );
}

function Lifecycle() {
  return (
    <>
      <h2>React Hook - useEffect</h2>
      {/* UI 컴포넌트 추가. 프롭스로 정수 50 전달. */}
      <MoveBox initPosition={50} />
    </>
  );
}

export default Lifecycle;
