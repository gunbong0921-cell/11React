import { NavLink } from 'react-router-dom';

const TopNavi = () => {
  return (
    <nav>
      <NavLink to="/">수명주기</NavLink>&nbsp;
      <NavLink to="/local">내부주기</NavLink>&nbsp;
      <Link to="/external">외부주기</Link>&nbsp;
    </nav>
  );
}

export default TopNavi;