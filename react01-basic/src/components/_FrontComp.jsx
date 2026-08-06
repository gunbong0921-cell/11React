/**
컴포넌트를 일반함수로 사용하는 경우 정의와 동시에 export를 할 수 있다.
 */
function FrontComp(props) {
  return (<>
    <li><a href="/" onClick={(event)=>{event.preventDefault(); props.onSetMode('front');}}>프론트엔드</a></li>
    <ul>
      <li>HTML5</li>
      <li>CSS3</li>
      <li>JavaScript</li>
      <li>jQuery</li>
    </ul>
  </>)
}

export default FrontComp