import { useState } from 'react';
import { realtime } from '../realtimeConfig';
import { ref, get, set, child, push, remove, update } from 'firebase/database';
import TopNavi from '../components/TopNavi';

//입력하기 
function RealtimeCRUD() {
  // 리얼타임 데이터베이스 참조
  console.log('Realtime', realtime);

  function writeUserData(userId, userName, userPass) {
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    set(ref(realtime, 'users/' + userId), {
      name: userName,
      pass: userPass,
      fireKey: newPostKey,
    });
    console.log('입력성공');
  }

  //데이터 읽기
  function readUserData(userId) {
    //데이터베이스 객체를 통해 참조값 얻기
    const dbRef = ref(realtime);
    //users 노드 하위의 userId 노드 참조
    //참조값을 통해 데이터 읽기
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      //데이터가 존재하는지 확인
      if (snapshot.exists()) {
        //데이터 출력
        console.log('데이터',snapshot.val());
      }
      else {
        console.log('데이터가 없습니다.');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function editUserData(userId, userName, userPass) {
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    const postData = {
      name: userName,
      pass: userPass,
      fireKey: newPostKey,
    };
    const updates = {};
    updates['/users/' + userId] = postData;
    return update(ref(realtime), updates);
  }

  function deleteUserData1(userId) {
    const deletes = {};
    deletes['/users/' + userId] = null;
    return update(ref(realtime), deletes);
  }

  function deleteUserData2(userId) {
    remove(ref(realtime, 'users/' + userId))
    .then(() => {
      console.log('삭제성공');
    })
    .catch((error) => {
      console.error('삭제실패',error);
    });
  }

  const [addNum, setAddNum] = useState(0);
  let adder = '-'+addNum;
  const id = 'kosmo'+adder;
  const name = '홍길동'+adder;
  const pass = '1234'+adder;
  return (
    <>
    <TopNavi />
    <h2>Realtime Database - CRUD</h2>
    <input type="number" value={addNum} onChange={(e) => setAddNum(e.target.value)} />
    <input type="button" value="입력" onClick={() => writeUserData(id, name, pass)} />
    <input type="button" value="읽기" onClick={() => readUserData(id)} />
    <input type="button" value="수정" onClick={() => editUserData(id, name+'edit', pass+'edit')} />
    <input type="button" value="삭제1" onClick={() => deleteUserData1(id)} />
    <input type="button" value="삭제2" onClick={() => deleteUserData2(id)} />
    </>
  );
}

export default RealtimeCRUD;