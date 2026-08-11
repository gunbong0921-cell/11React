import { memo, useCallback, useEffect, useState } from 'react';

/**
<div> 태그로 만든 상자 컴포넌트 박스 스타일을 표현한 함수와 숫자를 프롭스로 전달받고 있다. 
 */
const DivBox = memo(({ fnBoxStyle, numberVar }) => {
  //상태변수. 초기값은 빈 객체
  const [myStyle, setMyStyle] = useState({});
  //1차 랜더링 후 실행
  useEffect(() => {
    console.log('박스 스타일 변경');
    //fnBoxStyle() 함수 실행 결과를 상태변수 myStyle에 저장
    setMyStyle(fnBoxStyle());
  }, [fnBoxStyle]);
  /**
  의존성 배열로 fnBoxStyle 함수를 지정. 즉 함수가 변경될때마다 useEffect()를 재실행 하겠다는 의미
   */

  //<div> 태그로 만든 상자 형태의 UI로 구성 
  return <div style={myStyle}>{numberVar}</div>;
});

const UseCallbackExam = () => {
  //상태변수로 박스 크기와 컬러, 숫자를 관리 
  const [boxSize, setBoxSize] = useState(100);
  const [boxColor, setBoxColor] = useState(0);
  const [number, setNumber] = useState(0);
  //박스에 적응할 색깔을 배열로 정의 
  const colorArr = ['red', 'green', 'blue'];

  //step1 : useCallback 미사용 → number 변경 시에도 새 함수가 생성되어 DivBox가 다시 실행됨
  /**
  스테이트 변경에 의해 리랜더링이 될때마다 이 함수는 새로운 참조값을 부여받게 된다. 즉 참조값이 지속적으로 변경되므로 
  useEffect()가 계속 실행되어 무한 루프에 빠지게 된다. JavaScript의 메모리 누수를 발생시키고 성능 저하를 유발한다.
  박스스타일과 상관없는 숫자변경 버큰을 눌러도 useEffect()가 계속 실행되어 애플리케이션의 성능이 저할될 수 있다. 
   */
  // const fnBoxStyle = () => {
  //   return {
  //     backgroundColor: `${colorArr[boxColor]}`,
  //     width: `${boxSize}px`,
  //     height: `${boxSize}px`,
  //     textAlign: 'center',
  //     lineHeight: `${boxSize}px`,
  //   };
  // };

  //step2 : useCallback 사용 → boxColor/boxSize가 바뀔 때만 새 함수 생성
  /**
  스텝2의 함수를 메모이제이션 하기 위해 useCallback()을 사용. 두번째 인수는 의존성배열로 박스의 크기와 색깔이 변경될때만
  함수를 재할당 하겠다는 의미이다. 
  즉 박스의 스타일과 상관없는 작업이 수행될때는 함수를 재할당하지 않기 때문에 성능이 향상된다.   
   */
  const fnBoxStyle = useCallback(() => {
    return {
      backgroundColor : `${colorArr[boxColor]}`,
      width: `${boxSize}px`,
      height: `${boxSize}px`,
      textAlign: 'center',
      lineHeight: `${boxSize}px`,
    };
  }, 
  [boxColor, boxSize]);

  return (
    <>
      <h2>useCallback 사용하기</h2>
      <button onClick={() => setBoxSize(boxSize + 10)}>크기증가</button>
      <button onClick={() => setBoxColor((boxColor + 1) % 3)}>컬러변경</button>
      <button onClick={() => setNumber(number + 1)}>숫자변경</button>
      {/* 앞에서 정의한 함수와 상태변수를 프롭스를 통해 자식컴포넌트로 전달한다. */}
      <DivBox fnBoxStyle={fnBoxStyle} numberVar={number} />
    </>
  );
}

export default UseCallbackExam;
