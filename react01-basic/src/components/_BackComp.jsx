const BackComp = ({onMyEvent2}) => {
  return (<>
    <li><a href="/" onClick={(event)=>{event.preventDefault(); onMyEvent2('백엔드 클릭됨(자식전달)');}}>백엔드</a></li>
    <ul>
      <li>Java</li>
      <li>Oracle</li>
      <li>JSP</li>
      <li>Spring Boot</li>
    </ul>
  </>)
}

/**
콤포넌트를 화살표 함수로 정의하는 경우에는 export는 별도로 작성행한다. 여기서 export
(내보내기)한 컴포넌트명으로 import 해야 한다.
 */
export default BackComp