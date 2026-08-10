import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

//게시판 목록 컴포넌트 
function List() {
  //API 통신을 통해 얻어온 데이터를 저장할 상태변수. 초기값은 빈 배열.
  const [boardList, setBoardList] = useState([])
  //요청 URL
  let requestUrl = 'http://nakja.co.kr/APIs/php7/boardListJSON.php';
  //요청 파라미터 : 게시판의 종류, API키 
  let parameter = 'tname=board_apis';
  parameter += '&apikey=a2e51c609e85e86d53a0df8679fe8a36';

  //외부 API 요청하기 
  useEffect(function() {
    fetch(requestUrl + '?' + parameter)
    .then ((result) => {
      return result.json();
    })
    .then ((json) => {
      //API를 통해 얻어온 데이터를 상태변수에 저장.
      console.log(json);
      setBoardList(json);
    });
  }, []);
  //의존성배열에 빈 배열을 설정하여, 최초 한번만 실행되도록 한다. 

  let lists = boardList.map((row) => {
    //작성일은 앞에서 10글자를 잘라서 0000-00-00 형식으로 출력 
    let date = row.regdate.substring(0, 10);
    //제목도 문자열 잘라내기 처리 
    let subject = row.subject.substring(0, 20);
    return (
      //중복되지 않는 key-prop은 게시물의 일련번호로 설정 
      <tr key={row.idx}>
        <td className="cen">{row.idx}</td>
        {/* 열람 링크는 일련번호를 파라미터로 사용해서 요청URL 생성 */}
        <td><Link to={`/view/${row.idx}`}>{subject}</Link></td>
        <td className="cen">{row.name}</td>
        <td className="cen">{date}</td>
      </tr>
    );
  });

  return (
    <>
      <header>
        <h2>게시판-목록</h2>
      </header>
      <nav>
        <Link to="/write">글쓰기</Link>
      </nav>
      <article>
        <table id="boardTable">
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {/* 앞에서 map() 함수를 통해 생성한 배열을 출력 */}
            {lists}
          </tbody>
        </table>
      </article>
    </>
  );
}

export default List;
