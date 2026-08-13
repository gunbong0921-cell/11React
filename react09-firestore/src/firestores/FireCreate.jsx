import { firestore } from './firestoreConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const FireCreate = () => {
  //화면이동을 위한 훅 선언 
  const navigate = useNavigate();
  //입력 정보를 매개변수로 받은 후 입력처리 
  const memberWrite = async (p_collection, p_id, p_pass, p_name) => {
    //특히 입력한 아이디를 문서명으로 설정한다. 회원정보에서 아이디는 중복되지 않는 유이한 값이기 때문이다. 
    await setDoc(doc(firestore, p_collection, p_id), {
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: new Date().toISOString().slice(0, 10),
    });
    //등록일의 경우 날짜부분만 추가된다. 
    alert('입력 성공');
    //입력이 완료되면 읽기 화면으로 이동한다. 
    navigate('/read');
  }
  return (
    <>
    <h2>파이어스토어 입력하기</h2>
    {/* submit 이벤트 발생하면 target 속성으로 폼값을 읽어온다. */}
    <form onSubmit={(event) => {
      event.preventDefault();
      const form = event.target;
      let collection = form.collection.value;
      let id = form.elements.id.value;
      let pass = form.pass.value;
      let name = form.name.value;
      //폼값에 빈값이 있는지 검증 
      if (id === '') { alert('아이디를 입력해주세요.'); return; }
      if (pass === '') { alert('비밀번호를 입력해주세요.'); return; }
      if (name === '') { alert('이름을 입력해주세요.'); return; }
      //파이어스토어에 입력 처리 
      memberWrite(collection, id, pass, name);
      //새로운 입력을 위해 입력된 값 지우기 
      form.elements.id.value = '';
      form.pass.value = '';
      form.name.value = '';
    }}> 
      <table border="1">
        <tbody>
        <tr>
          <td>컬렉션</td>
          {/* 컬렉션명은 고정값으로 사용하기 위해 읽기전용으로 설정. readonly 속성 사용(없으면 에러메세지 출력됨) */}
          <td><input type="text" name="collection" value="members" readOnly /></td>
        </tr>
        {/* 아이디부터는 자유롭게 입력할 수 있다. */}
        <tr>
          <td>아이디</td>
          <td><input type="text" name="id" /></td>
        </tr>
        <tr>
          <td>비밀번호</td>
          <td><input type="text" name="pass" /></td>
        </tr>
        <tr>
          <td>이름</td>
          <td><input type="text" name="name" /></td>
        </tr>
        </tbody>
      </table>
      <button type="submit">입력</button>
    </form>
    </>
  );
}

export default FireCreate;