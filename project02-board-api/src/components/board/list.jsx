import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function List() {
  const [boardList, setBoardList] = useState([])
  let requestUrl = 'http://nakja.co.kr/APIs/php7/boardListJSON.php';
  let parameter = 'tname=board_apis';
  parameter += '&apikey=a2e51c609e85e86d53a0df8679fe8a36';

  useEffect(() => {
    fetch(requestUrl + '?' + parameter)
    .then ((result) => {
      return result.json();
    })
    .then ((json) => {
      console.log(json);
      setBoardList(json);
    });
  }, []);

  let lists = boardList.map((row) => {
    let date = row.regdate.substring(0, 10);
    let subject = row.subject.substring(0, 20);
    return (
      <tr key={row.idx}>
        <td className="cen">{row.idx}</td>
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
            {lists}
          </tbody>
        </table>
      </article>
    </>
  );
}

export default List;
