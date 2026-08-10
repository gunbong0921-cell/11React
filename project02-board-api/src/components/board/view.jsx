import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function View() {
  //화면 이동을 위한 훅
  const navigate = useNavigate();
  /**
  경로변수(path parameter) 형식의 라우팅 처리방식에서 파라미터(일련번호)를 추출하기 위한 훅 
   */
  const params = useParams();
  //게시물 데이터 저장을 위한 상태 변수 
  const [boardData, setBoardData] = useState({});
  //API 요청 URL
  let requestURL = 'http://nakja.co.kr/APIs/php7/boardViewJSON.php';
  //API 요청 파라미터(일련번호 idx 추가됨) 
  let parameter = 'tname=board_apis&idx=' + params.idx;
  parameter += '&apikey=a2e51c609e85e86d53a0df8679fe8a36';

  //랜더링 후 API 요청 및 리랜더링 
  useEffect(function() {
    fetch(requestURL + '?' + parameter)
    .then((result) =>{
      return result.json();
    })
    .then((json) => {
      setBoardData(json);
    });
  }, []);

  return (
    <>
      <header>
        <h2>게시판-열람</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>&nbsp;
        <Link to={'/edit/' + params.idx}>수정</Link>&nbsp;
        <Link onClick={() => {
          event.preventDefault();
          if (window.confirm('삭제하시겠습니까?')) {
            fetch('http://nakja.co.kr/APIs/php7/boardDeleteJSON.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
              },
              body: new URLSearchParams({
                tname: 'board_apis',
                idx: params.idx,
                apikey: 'a2e51c609e85e86d53a0df8679fe8a36',
              }),
            })
            .then((result) => {
              return result.json();
            })
            .then((json) => {
              if (json.result === 'success') {
                alert('삭제되었습니다.');
                navigate('/list');
              } 
              else {
                alert('삭제에 실패했습니다.');
              }
            });
          }
        }}>삭제</Link>
      </nav>
      <article>
        <table id="boardTable">
          <colgroup>
            <col width="20%" /><col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>{boardData.name}</td>
            </tr>
            <tr>
              <th>작성일</th>
              <td>{boardData.regdate}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>{boardData.subject}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td style={{ whiteSpace: 'pre-wrap' }}>{boardData.content}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
}

export default View;
