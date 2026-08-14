import '../Chat.css';
import { realtime } from '../realtimeConfig';
import { ref, child, set, push, onValue } from 'firebase/database';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import TopNavi from '../components/TopNavi';

const scrollTop = (chatWindow) => {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function ChatMessage() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  const chatWindow = useRef();
  const [chatData, setChatData] = useState([]);

  function messageWrite(chatRoom, chatId, chatMessage) {
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    set(ref(realtime, chatRoom + '/' + newPostKey), {
      id: chatId,
      message: chatMessage
    });
    console.log('입력성공');
  }

  const dbRef = ref(realtime, roomId);
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      setTimeout(() => {
        scrollTop(chatWindow.current);
      }, 200);
      let showDiv = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.val();
        if(childKey.id === userId) {
          showDiv.push(<div key={childSnapshot.key} style={{textAlign: 'right'}}>{childKey.message}</div>);
        }
        else {
          showDiv.push(<div key={childSnapshot.key}>{childKey.message}</div>);
        }
      });
      setChatData(showDiv);
    });
  }, []);

  return (
    <>
      <TopNavi />
      <h2>Realtime 채팅</h2>
      대화명 : {userId} &nbsp;&nbsp; 
      <button id="closeBtn" onClick={() => {window.self.close();}}>채팅종료</button>
      <div id="chatWindow" ref={chatWindow}>{chatData}</div>
      <div>
        <form onSubmit={(e) => {e.preventDefault();
          let chatRoom = e.target.chatRoom.value;
          let chatId = e.target.chatId.value;
          let message = e.target.message.value;
          if(message==='') {
            alert('메시지를 입력해주세요.');
            return;
          }
          messageWrite(chatRoom, chatId, message);
          e.target.message.value = '';
          return true;
        }}>
          <input type="hidden" name="chatRoom" value={roomId} />
          <input type="hidden" name="chatId" value={userId} />
          <input type="text" name="message" />
          <button type="submit">전송</button>
        </form>
      </div>
    </>
  );
}

export default ChatMessage;
