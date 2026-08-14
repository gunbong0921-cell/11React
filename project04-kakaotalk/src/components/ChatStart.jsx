import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebaseConfig';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const UPLOAD_TIMEOUT_MS = 5000;

const withTimeout = (promise, ms) => Promise.race([
  promise,
  new Promise((_, reject) => setTimeout(() => reject(new Error('upload timeout')), ms)),
]);

const ChatStart = () => {
  const navigate = useNavigate();
  const refRoomName = useRef();
  const refUserName = useRef();
  const refUserPic = useRef();
  const [roomName, setRoomName] = useState('우리집');
  const [opening, setOpening] = useState(false);

  const buildTalkUrl = (paramUrl='') => {
    const q = new URLSearchParams({
      roomName: refRoomName.current.value,
      userName: refUserName.current.value,
    });
    if (paramUrl.trim()) q.set('imgUrl', paramUrl);
    return {
      q,
      talkUrl: `${window.location.origin}${window.location.pathname}#/talk?${q.toString()}`,
    };
  }

  const openTalkWindow = (popup, paramUrl='') => {
    const { q, talkUrl } = buildTalkUrl(paramUrl);
    if (popup && !popup.closed) {
      popup.location.href = talkUrl;
    } else {
      navigate(`/talk?${q.toString()}`);
    }
    refUserName.current.value = '';
    refUserPic.current.value = '';
    setOpening(false);
  }

  const openChatWin = async () => {
    setOpening(true);
    const popup = window.open('about:blank', `talk_${Date.now()}`, 'width=500,height=700');
    const file = refUserPic.current?.files?.[0];

    if (!file) {
      openTalkWindow(popup);
      return;
    }

    try {
      const saveLocation = storageRef(storage, 'profile/' + Date.now() + '_' + file.name);
      const uploadImgUrl = await withTimeout(
        uploadBytes(saveLocation, file).then(() => getDownloadURL(saveLocation)),
        UPLOAD_TIMEOUT_MS
      );
      openTalkWindow(popup, uploadImgUrl);
    } catch (err) {
      console.error(err);
      alert('프로필 업로드에 실패했습니다. 기본 프로필로 채팅을 시작합니다.');
      openTalkWindow(popup);
    }
  }
  
  return (<>
    <div style={{margin:'20px'}}>
      <h2>카카오톡 제작하기</h2>
      <form onSubmit={(e)=>{
        e.preventDefault();
        openChatWin();
      }}>
        방명 : <input type="text" name="roomName" ref={refRoomName} required
                value={roomName} onChange={(e)=>setRoomName(e.target.value)} /> <br />
        대화명 : <input type="text" name="userName" ref={refUserName} required /> <br />
        프로필사진 : <input type="file" name="userPic" ref={refUserPic} accept="image/*" /> <br />
        <button type="submit" disabled={opening}>{opening ? '연결 중...' : '채팅시작'}</button>
      </form>
      <p style={{marginTop:'12px', color:'#666', fontSize:'14px'}}>
        같은 방명으로 대화명을 다르게 입력해 창을 두 개 열면 서로 채팅할 수 있습니다.
        팝업이 차단되면 현재 창에서 채팅이 열립니다.
      </p>
    </div>
  </>);
};

export default ChatStart;
