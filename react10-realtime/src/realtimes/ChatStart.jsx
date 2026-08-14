import { useRef } from 'react';
import TopNavi from '../components/TopNavi';

//대화방명, 대화명 입력을 위한 컴포넌트 
const ChatStart = () => {
  //input 입력상자의 DOM 참조 변수
  const refRoom = useRef();
  //refId: 대화명 입력상자의 DOM 참조 변수
  const refId = useRef();
  /**
  채팅창을 팝업으로 띄워주는 함수. 이때 입력한 대화방명, 대화명이 파라미터로 전달된다. 
   */
  const openChatWin = () => {
    /**
    useref() 훅으로 생성한 변수는 {current:값} 과 같은 형태의 객체로 생성되므로 아래와 같이 사용해야한다.
     */
    const talkUrl = `${window.location.origin}${window.location.pathname}#/chat/talk?roomId=${encodeURIComponent(refRoom.current.value)}&userId=${encodeURIComponent(refId.current.value)}`;
    window.open(talkUrl, '', 'width=400,height=500');
    //대화명은 지운다. 
    refId.current.value = '';
  }

  return (
    <>
      <TopNavi />
      <h2>Realtime Database - Chatting</h2>
      {/* ref속성으로 ref변수 부여. 대화방명은 myChating1로 고정. 대화명은 입력상자로 처리 */}
      대화방법 : <input type="text" name="roomId" value='myChating1' ref={refRoom} readOnly /> <br />
      대화명 : <input type="text" name="userId" ref={refId} /> <br />
      <button type="button" onClick={openChatWin}>채팅시작</button>
    </>
  );
}

export default ChatStart;
