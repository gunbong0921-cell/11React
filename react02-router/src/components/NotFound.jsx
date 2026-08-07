import{Link} from 'react-router-dom';

//라우팅 처리가 되지않음 URL로 접근할때 표시하는 컴포넌트 
const NotFound = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을 수 없습니다. <br />
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default NotFound;