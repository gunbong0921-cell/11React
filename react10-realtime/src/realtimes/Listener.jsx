import { useEffect, useState } from 'react';
import { realtime } from '../realtimeConfig';
import { ref, onValue } from 'firebase/database';
import TopNavi from '../components/TopNavi';

function Listener() {
  //데이터 처리를 위하 ㄴ상태변수 생성
  const [fireData, setFireData] = useState([]);
  //user 노드 하위의 데이터를 참조하는 변수 
  const dbRef = ref(realtime, 'users');
  //1차 랜더링 후 onValue() 함수 실행
  useEffect(() => {
    //이 함수를 통해 리얼타임 이스너 기능을 구현할 수 있다.
    onValue(dbRef, (snapshot) => {
      //데이터에 CRUD 기능을 구현하기 위하여 배열을 생성
      let showTr = [];
      //인출한 데이터의 개수만큼 반복
      snapshot.forEach((childSnapshot) => {
        //아이디를 인출(users 노드 하위의 데이터 구분자 역할)
        const childKey = childSnapshot.key;
        //아이디 하위에 저장된 데이터를 인출
        const childData = childSnapshot.val();
        showTr.push(
        <tr>
          <td>{childKey}</td>
          <td>{childData.name}</td>
          <td>{childData.pass}</td>
          <td>{childData.fireKey}</td>
        </tr>
        );
      });
      //상태변경함수 실행 
      setFireData(showTr);  
    });
  }, []);
  
  return (
    <>
      <TopNavi />
      <h2>Realtime Database - Listener</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>패스워드</th>
            <th>고유키</th>
          </tr>
        </thead>
        <tbody>
          {fireData}
        </tbody>
      </table>
    </>
  );
}

export default Listener;
