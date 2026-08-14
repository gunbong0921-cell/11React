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

  //데이터 수정
  function editUserData(userId, userName, userPass) {
    //고유키 생성 
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    //수정할 데이터 객체 생성 
    const postData = {
      name: userName,
      pass: userPass,
      fireKey: newPostKey,
    };
    //빈 객체를 생성
    const updates = {};
    //객체에 수정할 데이터를 key-value 형식으로 추가 
    updates['/users/' + userId] = postData;
    //수정함수 실행. 기존 데이터 뒤에 'edit' 붙여서 실행
    return update(ref(realtime), updates);
  }

  //삭제1
  function deleteUserData1(userId) {
    //빈 객체를 생성 
    const deletes = {};
    //객체에 삭제할 데이터를 key-value 형식으로 추가 
    deletes['/users/' + userId] = null;
    //수정을 위한 함수지만 Value가 null이므로 삭제처리한다. 
    return update(ref(realtime), deletes);
  }

  //삭제2
  function deleteUserData2(userId) {
    //remove() 함수를 통해 데이터 삭제. user 노드 하위의 아이디를 지정한다. 
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
    {/* 수정 시에는 기존 문자열에 'edit'를 추가해서 인수로 전달 */}
    <input type="button" value="수정" onClick={() => editUserData(id, name+'edit', pass+'edit')} />
    <input type="button" value="삭제1" onClick={() => deleteUserData1(id)} />
    <input type="button" value="삭제2" onClick={() => deleteUserData2(id)} />
    </>
  );
}

export default RealtimeCRUD;