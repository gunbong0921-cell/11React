import { memo, useCallback, useEffect, useState } from 'react';

/**
useCallback()
  : 함수를 메모이제이션하여, 의존성이 바뀔 때만 새 함수를 생성한다.
    자식 컴포넌트에 콜백을 props로 넘길 때 불필요한 리렌더링을 줄이는 데 쓰인다.
 */
const DivBox = memo(({ fnBoxStyle, numberVar }) => {
  const [myStyle, setMyStyle] = useState({});
  useEffect(() => {
    console.log('박스 스타일 변경');
    setMyStyle(fnBoxStyle());
  }, [fnBoxStyle]);

  return <div style={myStyle}>{numberVar}</div>;
});

const UseCallbackExam = () => {
  const [boxSize, setBoxSize] = useState(100);
  const [boxColor, setBoxColor] = useState(0);
  const [number, setNumber] = useState(0);
  const colorArr = ['red', 'green', 'blue'];

  //step1 : useCallback 미사용 → number 변경 시에도 새 함수가 생성되어 DivBox가 다시 실행됨
  const fnBoxStyle = () => {
    return {
      backgroundColor: `${colorArr[boxColor]}`,
      width: `${boxSize}px`,
      height: `${boxSize}px`,
      textAlign: 'center',
      lineHeight: `${boxSize}px`,
    };
  };

  //step2 : useCallback 사용 → boxColor/boxSize가 바뀔 때만 새 함수 생성
  // const fnBoxStyle = useCallback(() => {
  //   return {
  //     backgroundColor : `${colorArr[boxColor]}`,
  //     width: `${boxSize}px`,
  //     height: `${boxSize}px`,
  //     textAlign: 'center',
  //     lineHeight: `${boxSize}px`,
  //   };
  // }, [boxColor, boxSize]);

  return (
    <div>
      <h2>useCallback 사용하기</h2>
      <button onClick={() => setBoxSize(boxSize + 10)}>크기증가</button>
      <button onClick={() => setBoxColor((boxColor + 1) % 3)}>컬러변경</button>
      <button onClick={() => setNumber(number + 1)}>숫자변경</button>
      <DivBox fnBoxStyle={fnBoxStyle} numberVar={number} />
    </div>
  );
};

export default UseCallbackExam;
