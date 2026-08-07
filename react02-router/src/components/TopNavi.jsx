import { Link, NavLink } from 'react-router-dom';

/**
NaviLink, Link 컴포넌트는 <a> 태그와 같이 하이퍼링크를 제공하낟.단 preventDefault()가 적용된
형태로 깜박임없이 페이지 이동을 할 수 있다. 
 */
const TopNavi = () => {
  return (
    <nav>
      {/* a태그를 사용하는 경우에는 화면의 깜박임이 있으므로 합성이벤트 객체를 통해 반드시 
      preventDefault() 메서드를 호출해야한다. */}
      <a href="/">Home</a>&nbsp;
      {/* NavLink 컴포넌트의 경우 링크를 클릭하면 엘리먼트에 active 클래스 속성을 자동으로 추가해준다.
      이를 통해 CSS 스타일을 적용할 수 있다. */}
      <NavLink to="/intro">인트로</NavLink>&nbsp;
      <NavLink to="/intro/router">Router관련Hook</NavLink>&nbsp;
      {/* Link 컴포넌트는 NavLink와 달리 active 클래스 속성을 자동으로 추가하지 않는다. */}
      <Link to="/xyz">잘못된URL</Link>&nbsp;
    </nav>
  );
}

export default TopNavi;