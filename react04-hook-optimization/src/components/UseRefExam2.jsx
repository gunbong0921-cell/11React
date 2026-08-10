import { useEffect, useRef } from 'react';

const UseRefExam2 = () => {
  const passRef1 = useRef();
  const passRef2 = useRef();

  //컴포넌트의 1차 랜더링 후 실행
  useEffect(() => {
    console.log('passRef', passRef1, passRef2);
    //비밀번호 첫번째 입력상자에 포커싱
    passRef1.current.focus();
  }, []);

  //비밀번호 확인 함수
  const checkPassword = () => {
    //2개의 비밀번호가 모두 입력되어 있는지 확인 
    if (passRef1.current.value === '' || passRef2.current.value === '') {
      alert('비밀번호를 입력해주세요.');
      passRef1.current.focus();
      return;
    }
    //2개의 비밀번호가 일치하는지 확인 
    if (passRef1.current.value === passRef2.current.value) {
      alert('비밀번호 확인이 완료되었습니다.');
    } 
    else {
      //일치하지 않는다면 경고창을 띄우고
      alert('비밀번호가 일치하지 않습니다.');
      //기존 입력값을 모두 지운 후
      passRef1.current.value = '';
      passRef2.current.value = '';
      //첫번째 입력상자로 포커스를 이동한다. 
      passRef1.current.focus();
    }
  };

  return (
    <>
      <h2>useRef 사용하기2</h2>
      <form>
        패스워드1: <input type="text" ref={passRef1} name="pass1" />
        <br />
        패스워드2: <input type="text" ref={passRef2} name="pass2" />
        <br />
        <button type="button" onClick={checkPassword}>패스워드확인</button>
      </form>
    </>
  );
};

export default UseRefExam2;
