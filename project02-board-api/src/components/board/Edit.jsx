import { Link, useParams } from 'react-router-dom'

function Edit() {
  const { idx } = useParams()

  return (
    <>
      <header>
        <h2>게시판-수정(idx: {idx})</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>
      </nav>
      <article>
        <form>
          <table id="boardTable">
            <tbody>
              <tr>
                <th>작성자</th>
                <td><input type="text" name="writer" defaultValue="성유겸" /></td>
              </tr>
              <tr>
                <th>제목</th>
                <td><input type="text" name="title" defaultValue="오늘은 React공부하는날" /></td>
              </tr>
              <tr>
                <th>내용</th>
                <td>
                  <textarea name="contents" cols="22" rows="3" defaultValue="열심히 해봅시당&#10;열공 합시당"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="전송" />
        </form>
      </article>
    </>
  )
}

export default Edit
