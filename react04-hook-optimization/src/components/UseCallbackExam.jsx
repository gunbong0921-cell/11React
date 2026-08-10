import { memo, useCallback, useEffect, useState } from 'react';

/**
useCallback()
  : 함수를 메모이제이션하여, 의존성이 바뀔 때만 새 함수를 생성한다.
    자식 컴포넌트에 콜백을 props로 넘길 때 불필요한 리렌더링을 줄이는 데 쓰인다.
 */
const Child = memo(({ handleClick }) => {
  useEffect(() => {
    console.log('Child 렌더링');
  });

  return <button onClick={handleClick}>자식 버튼</button>;
});

function UseCallbackExam() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // count가 바뀔 때만 새 함수 생성 → Child의 불필요한 리렌더 방지
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <h2>useCallback 예제</h2>
      <p>Count: {count}</p>
      <p>Other: {other}</p>
      <button onClick={() => setOther(other + 1)}>Other 증가</button>
      <Child handleClick={handleClick} />
    </div>
  );
}

export default UseCallbackExam;
