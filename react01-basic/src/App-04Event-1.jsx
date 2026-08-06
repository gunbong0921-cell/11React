/**
Event 처리
  : HTML에서는 이벤트 리스너를 작설할때 대소문자를 구분하지 않는다. 하지만 React는 이벤트명의
    첫글자를 반드시 대문자로 작성해야한다. 또한 이벤트는 자식 컴포넌트가 부모 컴포넌트로 데이터를 
    전달할때 반드시 함수를 통해서만 전달할 수 있다. 
 */
function FrontComp(props) {
  //매개변수는 props로 정의. 즉 모든 프롭스를 한꺼번에 받을 수 있다. 
  return (<>
    {/* <a> 태그를 통해 생성한 링크를 클릭하면 부모로부터 전달받은 함수를 호출한다. 그러면 alert()
    를 통해 경고창이 화면에 표시된다. */}
    <li><a href="/" onClick={()=>{props.onMyEvent1();}}>프론트엔드</a></li>
    <ul>
      <li>HTML5</li>
      <li>CSS3</li>
      <li>JavaScript</li>
      <li>jQuery</li>
    </ul>
  </>)
}
function App() {
  return (<>
    <h2>React-Event</h2>
    <ol>
      {/* 프롭스를 통해 함수를 전달하고 있다. 이 함수는 고정된 메세지를 알림창으로 출력한다. */}
      <FrontComp onMyEvent1={()=>{alert("프론트엔드 클릭(부모전달)");}}></FrontComp>
    </ol>
  </>)
}

export default App
