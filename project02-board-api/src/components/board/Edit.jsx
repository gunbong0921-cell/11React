import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Edit() {
  //페이지 이동, 파라미터 관련 훅 선언 
  const navigate = useNavigate();
  const params = useParams();
  //기존 작성된 게시물의 내용을 얻어오기 위한 열람 API 호출 
  let requestURL = 'http://nakja.co.kr/APIs/php7/boardViewJSON.php';
  let parameter = 'tname=board_apis&idx=' + params.idx;
  parameter += '&apikey=a2e51c609e85e86d53a0df8679fe8a36';
  /**
  <input>태그의 value 속성에 값을 설정하면 react는 ReadOnly 속성으로 랜더링한다. 따라서 이 값을 
  수정하려면 스테이트가 필요하다. onChange이벤트 핸들러에서 setter 함수를 호출하여 스테이트 값을 수정한다.
   */

  //입력상자의 갯수만큼 상태변수를 선언한다. 
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  //열람 API를 요청하여 데이터를 얻어온다. 
  useEffect(function() {
    fetch(requestURL + '?' + parameter)
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      //얻어온 데이터를 파싱해서 상태변수 변경(input에 설정된 값)
      setWriter(json.name || '');
      setTitle(json.subject || '');
      // API 응답 필드명은 content
      setContents(json.content || '');
    });
  }, []);

  return (
    <>
      <header>
        <h2>게시판-수정</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>
      </nav>
      <article>
        <form onSubmit={
          (event) => {
            event.preventDefault();
            //수정 API 호출 
            // title은 form.title(HTML 속성)과 충돌하므로 elements로 접근
            const form = event.target.elements;
            fetch(
              'http://nakja.co.kr/APIs/php7/boardEditJSON.php',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
                //입력값과 게시물의 일련번호를 쿼리스트링으로 조합 
                body: new URLSearchParams({
                  tname: 'board_apis',
                  idx: params.idx,
                  name: form.writer.value,
                  subject: form.title.value,
                  content: form.contents.value,
                  apikey: 'a2e51c609e85e86d53a0df8679fe8a36',
                }),
              }
            )
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              //수정이 완료되면 내용 확인을 위해 열람페이지로 이동 
              navigate('/view/' + params.idx);
            });
          }
        }>
          <table id="boardTable">
            <tbody>
              <tr>
                <th>작성자</th>
                {/* 스테이트에 저장된 값을 value에 설정하고 onChange이벤트 핸들러를 통해 입력한 값을 실시간으로 변경해서
                적용한다. */}
                <td><input type="text" name="writer" value={writer} onChange={(event) => {setWriter(event.target.value)}} /></td>
              </tr>
              <tr>
                <th>제목</th>
                <td><input type="text" name="title" value={title} onChange={(event) => {setTitle(event.target.value)}} /></td>
              </tr>
              <tr>
                <th>내용</th>
                {/* HTML에서는 textarea에 값을 적용하려면 태그사이에 값을 삽입해야하지만, JSX에서는 input과 동일하게 value속성을 사용하면 된다. */}
                <td>
                  <textarea name="contents" cols="22" rows="3" value={contents} onChange={(event) => {setContents(event.target.value)}}></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="수정" />
        </form>
      </article>
    </>
  );
}

export default Edit;
