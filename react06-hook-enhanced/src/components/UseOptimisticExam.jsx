import { useOptimistic, useState, useRef } from 'react';

//메세지를 서버로 전송하는 것을 표현한 비동기 함수 
async function deliverMessage(message) {
  //실제 네트워크 요청처럼 보이도록 1초 대기후 전달받은 메세지 반환 
  await new Promise(resolve => setTimeout(resolve, 1000));
  //처리가 진행되는 1초를 기다린 후 값을 반환하기위해 await 키워드 사용 
  return message;
}

//메세지 목록과 입력폼을 렌더링하는 컴포넌트 
function Thread({ messages, sendMessage }) {
  //<form> 태그의 ref 속성값을 저장하기 위한 참조변수 선언 
  const formRef = useRef(null);

  /**
  useOptimistic 훅은 두 개의 매개변수를 받는다.
    optimisticMessages : 낙관적 업데이트를 위한 상태값
    addOptimisticMessage : 낙관적 업데이트를 위한 함수
    messages : useState의 초기값으로 실제 메세지 목록을 전달
    상태변경함수 : 현재상태와 메세지를 받은 후 기존 상태를 업데이트하는 함수 
   */
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  //폼 제출시 실행되는 비동기 함수 
  async function formAction(formData) {
    //폼값으로 받은 메세지를 변수에 저장
    const message = formData.get('message');
    //폼값으로 받은 메세지를 UI에 즉시 추가(낙관적 업데이트 실행)
    addOptimisticMessage(message);
    //다음 메세지 입력을 위해 폼 전체를 리셋
    formRef.current.reset();
    //메세지를 서버로 전송
    await sendMessage(message);
  }

  //메세지 목록과 입력폼 UI를 랜더링 
  return (
    <>
      {/* 낙관적 업데이트로 즉시 반영할 UI를 통해 반복 실행 */}
      {optimisticMessages.map((msg, index) => (
        // 입력된 메세지 표시
        <div key={index}>
          {/* 입력된 메세지 출력 */}
          {msg.text}
          {/* !!은 boolean 값으로 변환하는 연산자로 메세지를 입력하면 낙관적 업데이트가 반영되는 동안 메세지 전송중을 표시 */}
          {!!msg.sending && <small> (sending...)</small>}
        </div>
      ))}
      {/* 입력폼 구성. 폼 제출시 formAction() 함수를 실행 */}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="메시지를 입력하세요" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

const UseOptimisticExam = () => {
  //메세지 관리를 위한 상태변수. 초기값은 객체형 배열로 생성
  const [messages, setMessages] = useState([
    { text: '기본 메시지 입니다', sending: false, key: 1 },
  ]);
  //sendng 키값은 false일때 'Sending' 문자열을 출력하고 true일때는 'Sent' 문자열을 출력한다.

  //메세지를 서버로 전송하는 비동기 함수
  async function sendMessage(message) {
    //메세지 전송시 1초간 대기 후 반환해주는 함수호출(실제 서버 호출을 가정)
    const sentMessage = await deliverMessage(message);
    //1초 후 반환된 메세지로 상태 업데이트 
    setMessages(prev => [...prev, { text: sentMessage, sending: false }]);
    /**
    즉 처음 메세지가 추가될때 true였던 항목을 false로 변경한다. 그러면 'Sending...' 부분이 숨김처리된다. 
     */
  }

  //전체 UI 구성. 상태변수와 함수를 프롭스로 전달한다.  
  return (
    <div>
      <h2>useOptimistic 사용하기</h2>
      <Thread messages={messages} sendMessage={sendMessage} />
    </div>
  );
};

export default UseOptimisticExam;
