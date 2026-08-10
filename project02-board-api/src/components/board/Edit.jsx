import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Edit() {
  const navigate = useNavigate();
  const params = useParams();
  let requestURL = 'http://nakja.co.kr/APIs/php7/boardViewJSON.php';
  let parameter = 'tname=board_apis&idx=' + params.idx;
  parameter += '&apikey=a2e51c609e85e86d53a0df8679fe8a36';
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  useEffect(function() {
    fetch(requestURL + '?' + parameter)
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      setWriter(json.name || '');
      setTitle(json.subject || '');
      // API 응답 필드명은 content
      setContents(json.content || '');
    });
  }, []);

  return (
    <>
      <header>
        <h2>게시판-수정(idx: {params.idx})</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>
      </nav>
      <article>
        <form onSubmit={
          (event) => {
            event.preventDefault();
            // title은 form.title(HTML 속성)과 충돌하므로 elements로 접근
            const form = event.target.elements;
            fetch(
              'http://nakja.co.kr/APIs/php7/boardEditJSON.php',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
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
              navigate('/view/' + params.idx);
            });
          }
        }>
          <table id="boardTable">
            <tbody>
              <tr>
                <th>작성자</th>
                <td><input type="text" name="writer" value={writer} onChange={(event) => {setWriter(event.target.value)}} /></td>
              </tr>
              <tr>
                <th>제목</th>
                <td><input type="text" name="title" value={title} onChange={(event) => {setTitle(event.target.value)}} /></td>
              </tr>
              <tr>
                <th>내용</th>
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

export default Edit
