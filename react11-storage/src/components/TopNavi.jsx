import { NavLink } from "react-router-dom";

const TopNavi = () => {
  return (
    <nav>
      <NavLink to="/upload">Upload</NavLink>
      <NavLink to="/filelists">File Lists</NavLink>
    </nav>
  );
}

export default TopNavi;