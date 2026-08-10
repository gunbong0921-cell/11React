import { useId, useState } from 'react';

/**
useId()
  : 고유 ID를 생성한다. 서버/클라이언트 하이드레이션 시에도 일치하며,
    label-input 연결 등 접근성 속성에 사용하기 좋다.
 */
function MyInput({ label }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </div>
  );
}

function UseIdExam() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <h2>useId 예제</h2>
      <button onClick={() => setShow(!show)}>토글</button>
      {show && (
        <>
          <MyInput label="이름" />
          <MyInput label="이메일" />
        </>
      )}
    </div>
  );
}

export default UseIdExam;
