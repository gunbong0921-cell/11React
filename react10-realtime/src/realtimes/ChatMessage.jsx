//채팅 페이지에서만 단독으로 사용할 CSS 파일을 불러온다. 
import '../Chat.css';
//리얼타임 데이터베이스 설정 파일을 불러온다. 
import { realtime } from '../realtimeConfig';
import { ref, child, set, push, onValue } from 'firebase/database';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import TopNavi from '../components/TopNavi';

/**
웹브라우저의 스크롤바를 최하단으로 내려주는 함수. 채팅창에서는 대화내역이 아래쪽으로 채워지므로
스크롤바는 항상 최하단에 위치하도록 처리한다.  
 */
const scrollTop = (chatWindow) => {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function ChatMessage() {
  //쿼리스트링으로 전달되는 개별 파라미터 읽기 
  const [searchParams] = useSearchParams();
  //대화방명, 대화명을 읽어서 변수에 저장 
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  ////대화내용이 디스플레이되는 창의 DOM 참조 변수 
  const chatWindow = useRef();
  //리얼타임에 저장된 대화내역을 상태변수에 저장하기 위한 변수 
  const [chatData, setChatData] = useState([]);

  //메세지 입력 함수 
  function messageWrite(chatRoom, chatId, chatMessage) {
    //일련번호로 사용할 문자열 생성
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    //set() 함수로 메세지 추가. '대화방명'이 최상위 노드가 되고, 일련번호를 키로 사용하여 메세지를 추가한다. 
    set(ref(realtime, chatRoom + '/' + newPostKey), {
      id: chatId,
      message: chatMessage
    });
    console.log('입력성공');
  }

  //최상위 노드인 '대화방명'을 통해 참조변수 생성 
  const dbRef = ref(realtime, roomId);
  useEffect(() => {
    //대화내용을 실시간으로 감지할 리스너 함수 실행 
    onValue(dbRef, (snapshot) => {
      //새로운 메세지가 있으면 0.2초 후 스크롤을 아래로 내려준다. 
      setTimeout(() => {
        scrollTop(chatWindow.current);
      }, 200);
      let showDiv = [];
      //전체 대화내역을 통해 반복 실행 
      snapshot.forEach((childSnapshot) => {
        //해당 루프의 데이터 인출 
        const childKey = childSnapshot.val();
        /**
        채팅창에서는 내가 보낸 메세지와 상대방의 메세지를 서로 다르게 정렬해서 디스플레이 해야한다.  
         */
        if(childKey.id === userId) {
          //내가 보낸 메세지는 오른쪽으로 정렬해서 출력
          showDiv.push(<div key={childSnapshot.key} style={{textAlign: 'right'}}>{childKey.message}</div>);
        }
        else {
          //상대방의 메세지는 대화명과 함께 왼쪽으로 정렬해서 출력
          showDiv.push(<div key={childSnapshot.key}>{childKey.id} : {childKey.message}</div>);
        }
      });
      setChatData(showDiv);
    });
  }, []);

  return (
    <>
      <TopNavi />
      <h2>Realtime 채팅</h2>
      대화명 : <input type="text" id="chatId" value={userId} disabled /> &nbsp;&nbsp; 
      <button id="closeBtn" onClick={() => {window.self.close();}}>채팅종료</button>
      {/* 대화 내역이 출력되는 DOM 요소 */}
      <div id="chatWindow" ref={chatWindow}>{chatData}</div>
      <div>
        {/* 대화 입력 폼 */}
        <form onSubmit={(e) => {e.preventDefault();
          let chatRoom = e.target.chatRoom.value;
          let chatId = e.target.chatId.value;
          let message = e.target.message.value;
          //입력된 메세지가 없다면 경고창 띄움 
          if(message==='') {
            alert('메시지를 입력해주세요.');
            return;
          }
          //메세지 입력 함수 실행 
          messageWrite(chatRoom, chatId, message);
          e.target.message.value = '';
          return true;
        }}>
          {/* 파라미터로 전달받은 채팅방명, 대화명은 숨김 처리 */}
          <input type="hidden" name="chatRoom" value={roomId} />
          <input type="hidden" name="chatId" value={userId} />
          {/* 메세지 입력 상자 */}
          <input type="text" name="message" />
          <button type="submit">전송</button>
        </form>
      </div>
    </>
  );
}

export default ChatMessage;
