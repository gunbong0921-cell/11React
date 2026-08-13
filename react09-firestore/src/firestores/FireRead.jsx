import { firestore } from './firestoreConfig';
//각 패키지로부터 관련함수, 훅, 컴포넌트를 임포트 
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const FireRead = () => {
  //파이어스토어에 저장된 데이터를 저장하기 위한 상태변수 
  const [showData, setShowData] = useState([]);
  //새로운 랜더링을 위한 상태변수 
  const [isRender, setIsRender] = useState(true);

  //컬렉션 하위 문서 전체를 읽어오기 위한 함수 
  const getCollection = async () => {
    let trArray = [];
    //memebers 컬렉션 하위의 모든 문서를 배열로 얻어온다.
    const querySnapshot = await getDocs(collection(firestore, 'members'));
    //얻어온 문서는 배열이므로 forEach()를 통해 반복할 수 있다. 
    querySnapshot.forEach((row) => {
      //해당 루프의 문서를 인출 
      let memberInfo = row.data();
      //문서 내부 key를 이용해서 <tr> 태그를 생성한다. 
      trArray.push(
        <tr key={row.id}>
          <td>{memberInfo.id}</td>
          <td>{memberInfo.pass}</td>
          <td>{memberInfo.name}</td>
          <td>{memberInfo.regdate}</td>
          <td>
            {/* 수정 링크 */}
            <NavLink to={'/update/' + row.id}>[수정]</NavLink>&nbsp;
            {/* 삭제 링크 */}
            <NavLink to="/read" onClick={async () => {
              //삭제시 컬렉션과 문서명만 지정한 후 함수를 실행
              await deleteDoc(doc(firestore, 'members', row.id));
              alert('삭제되었습니다.');
              //삭제가 완료되면 화면에 적용하기 위해 리랜더링 한다. 
              setIsRender((prev) => !prev);
            }}>[삭제]</NavLink>
          </td>
        </tr>
      );
    });
    //데이터 로드가 완료되면 변경해서 리랜더링 한다. 
    setShowData(trArray);
  };

  //1차 랜더링이 완료된 후 함수를 호출하여 데이터를 얻어온다.
  useEffect(() => {
    getCollection();
  }, [isRender]);
  /**
  isRender 상태변수는 데이터를 삭제할때 변경된다. 따라서 삭제 후 화면을 새롭게 랜더링 하면서 
  파이어스토어에서 데이터를 다시 읽어오게 하기 위해 사용한다. 
   */

  return (
    <>
    <h2>파이어스토어 목록</h2>
    <table border="1">
      <thead>
        <tr className="text-center">
          <th>아이디</th>
          <th>비밀번호</th>
          <th>이름</th>
          <th>가입일</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {showData}
      </tbody>
    </table>
    </>
  );
};

export default FireRead;
