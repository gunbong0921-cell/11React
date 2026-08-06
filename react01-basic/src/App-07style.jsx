/**
JSX에서 스타일을 적용하는 방법
: JSX애서는 HTML과는 조금 다른 방식으로 스타일을 적용한다. 
-class 속성은 calssname으로 변경한다. javaScript에서는 이미 예약어로 사용하고 있기 때문이다.
-id속성은 그대로 사용할 수 있다.
-style 속성은 인라인 스타일 방식으로 적용한다. 컬러브레이스{}로 감싸서 사용한다.
 */

//이미지 경로를 통해 임포트 
import jqueryLogo from './assets/jquery.png'

function App() {
  //CSS 스타일을 JSON 형식으로 적용한다. 
  const myStyle = {
    color: 'white', 
    backgroundColor: 'DodgerBlue',
    padding: '10px',
    fontFamily: 'Verdana'
  };
  const iWidth = {maxWidth: '300px'};
  return (
    <>
      <h2>React-Style</h2>
      <ol>
        {/* style 속성으로 인라인 방식의 스타일 부여. 이때는 콧수염괄호를 통해 속성값을 부여한다. */}
        <li style={{color: 'red'}}>프론트엔드</li>
        <ul>
          {/* public 하위의 img 폴더에 있는 이미지를 불러온다. React프로젝트에서 정적파일은 주로 public 
          폴더에 위치한다. */}
          <li><img src="/img/html_css_js.png" style={iWidth} /></li>
          {/* import 한 이미지 표시 */}
          <li><img src={jqueryLogo} style={iWidth} /></li>
          {/* http로 시작하는 외부 이미지 표시 */}
          <li><img src="http://nakja.co.kr/images/reactjs.png" style={iWidth} /></li>
        </ul>
        <li className='backEnd'>백엔드</li>
        <ul>
          <li id='backEndSub'>Java</li>
          <li class='warning'>Oracle</li>
          <li style={myStyle}>JSP</li>
          <li>Spring Boot</li>
        </ul>
      </ol>
    </>
  )
}

export default App

