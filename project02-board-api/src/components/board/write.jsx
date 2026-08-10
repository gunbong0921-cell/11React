import { Link, useNavigate } from 'react-router-dom'

function Write() {
  //페이지 이동을 위한 Hook. 별도의 인자없이 변수 생성. 
  const navigate = useNavigate();

  return (
    <>
      <header>
        <h2>게시판-작성</h2>
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
            /**
            작성 API 호출 
            fetch() 함수를 통해 post방식으로 요청을 하는 경우 객체 형식의 두번째 인자가 필요함.  
             */
            fetch(
              'http://nakja.co.kr/APIs/php7/boardWriteJSON.php',
              //1.전송방식 설정
              {
                method: 'POST',
                //2.헤더설정(컨텐츠타입, 캐릭터셋)
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
                /**
                3.작성자가 입력한 폼값을 json형식으로 조립하여 전송한다. URLSearchParams객체는 Javascript에서 제공되며,
                JSON형식으로 데이터를 쿼리스트링 형식으로 변환한다. 
                 */
                body: new URLSearchParams({
                  tname: 'board_apis',
                  name: form.writer.value,
                  subject: form.title.value,
                  content: form.contents.value,
                  apikey: 'a2e51c609e85e86d53a0df8679fe8a36',
                }),
              }
            )
            .then ((response) => response.json())
            .then ((json) => {
              console.log(json);
              //글쓰기가 완료되면 목록으로 이동 
              navigate('/list');
            });
          }
        }>
          <table id="boardTable">
            <tbody>
              <tr>
                <th>작성자</th>
                <td><input type="text" name="writer" /></td>
              </tr>
              <tr>
                <th>제목</th>
                <td><input type="text" name="title" /></td>
              </tr>
              <tr>
                <th>내용</th>
                <td><textarea name="contents" cols="22" rows="3"></textarea></td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="전송" />
        </form>
      </article>
    </>
  )
}

export default Write
