import { useActionState } from 'react';

//로그인 처리를 위한 비동기 함수 정의 
async function authLogin(prevState, formData) {
  //첫번째 매개변수인 이전상태를 콘솔로 확인 
  console.log('prevState', prevState);
  //사용자가 입력한 폼값을 읽음
  const userid = formData.get('userid');
  const userpw = formData.get('userpw');

  //1초 대기 후 로그인 처리 
  await new Promise(resolve => setTimeout(resolve, 1000));

  //로그인 여부 판단 
  if (userid === 'kosmo' && userpw === '1234') {
    return "로그인 성공";
  }
  else {
    return "로그인 실패";
  }
}

const UseActionStateExam = () => {
  /**
  message : authLogin 함수의 반환값을 저장하는 상태 변수 
  formAction : 폼 제출 시 실행할 액션 함수 
  isPending : 비동기 작업 진행 중인지 여부를 나타내는 불리언 값
  authLogin : 로그인 처리를 위한 비동기 함수
  null : 초기값 즉, 초기상태를 나타내는 값
   */
  const [message, formAction, isPending] = useActionState(authLogin, null);

  return (
    <>
    <h2>useActionState 사용하기</h2>
    <form action={formAction}>
      아이디 : <input type="text" name="userid" /> <br />
      비밀번호 : <input type="password" name="userpw" /> <br />
      <button type="submit">로그인</button>
      {/* 로그인 처리 중 로딩 메세지 표현. 폼값이 제출중이라면 true를 반환하나, 그렇지 않다면 message 상태값을 표현. */}
      {isPending ? 'Loading...' : message}
    </form>
    </>
  )
}

export default UseActionStateExam;
