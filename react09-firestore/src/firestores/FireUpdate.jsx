import { firestore } from './firestoreConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FireUpdate = () => {
  /**
  수정페이지의 라우팅 처리는 'path=/update/:userid' 형식으로 설정되어 있다. 경로형태로 아이디가
  파라미터로 전달되면 이 값을 useParams() 훅을 통해 가져올 수 있다. 
   */
  const params = useParams();
  //화면이동을 위한 훅 선언 
  const navigate = useNavigate();

  //입력상자에 설정된 값 수정을 위한 상태변수 
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  /**
  수정처리 : 컬렉션명만 매개변수로 전달되고, 나머지 입력값은 상태변수로 관리되므로 별도의 전달없이
  바로 사용이 가능하다. 
   */
  const memberEdit = async (p_collection) => {
    //쓰기와 동일한 함수를 사용한다. 즉 기존 문서가 있다면 수정처리하고, 없다면 추가처리한다.  
    await setDoc(doc(firestore, p_collection, params.userid), {
      id,
      pass,
      name,
      regdate: new Date().toISOString().slice(0, 10),
    });
    alert('수정되었습니다.');
    navigate('/read');
  }

  useEffect(() => {
    if (!params.userid) return;

    getDoc(doc(firestore, 'members', params.userid)).then((docSnap) => {
      if (docSnap.exists()) {
        console.log('문서', docSnap.data());
        let callData = docSnap.data();
        setId(callData.id);
        setPass(callData.pass);
        setName(callData.name);
      }
      else {
        console.log('문서가 존재하지 않습니다.');
      }
    });
    /**
    1차 랜더링 후 데이터를 인출해서 설정하낟. 의존성 배열은 파라미터 값이 변경될때마다 실행된다. 
     */
  }, [params.userid]);

  return (
    <>
    <h2>파이어스토어 수정하기</h2>
    <form onSubmit={(event) => {
      event.preventDefault();
      //여기서는 폼값이 submit되면 컬렉션명만 target을 통해 받으면 된다.
      let collection = event.target.collection.value;
      //컬렉션명만 인수로 전달해서 수정처리한다. 
      memberEdit(collection);
    }}>
      <table border="1">
        <tbody>
          <tr>
            <td>컬렉션</td>
            <td><input type="text" name="collection" value="members" readOnly /></td>
          </tr>
          <tr>
            <td>아이디(수정불가)</td>
            <td><input type="text" name="id" value={id} readOnly /></td>
          </tr>
          {/* value속성에 적용된 값은 기본적으로 readonly 속성이 적용되므로 onChange 이벤트를 통해 값을 변경할 수 있다. */}
          <tr>
            <td>비밀번호</td>
            <td><input type="text" name="pass" value={pass} onChange={(event) => setPass(event.target.value)} /></td>
          </tr>
          <tr>
            <td>이름</td>
            <td><input type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} /></td>
          </tr>
        </tbody>
      </table>
      <button type="submit">수정</button>
    </form>
    </>
  );
}

export default FireUpdate;