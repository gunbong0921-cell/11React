import { Link, useParams } from 'react-router-dom'

function View() {
  const { idx } = useParams()

  return (
    <>
      <header>
        <h2>게시판-열람</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>&nbsp;
        <Link to={`/edit/${idx}`}>수정</Link>&nbsp;
        <Link to="/list">삭제</Link>
      </nav>
      <article>
        <table id="boardTable">
          <colgroup>
            <col width="30%" /><col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>성유겸</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>오늘은 React공부하는날</td>
            </tr>
            <tr>
              <th>날짜</th>
              <td>2023-05-05</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>열심히 해봅시당<br />열공 합시당</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  )
}

export default View
