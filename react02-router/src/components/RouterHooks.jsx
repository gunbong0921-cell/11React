import { useLocation, useNavigate, useParams } from 'react-router-dom';

const RouterHooks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div>
      <h3>Router 관련 Hook</h3>
      <ul>
        <li>pathname: {location.pathname}</li>
        <li>search: {location.search || '(없음)'}</li>
        <li>params: {JSON.stringify(params)}</li>
      </ul>
      <button type="button" onClick={() => navigate('/')}>
        Home으로 이동
      </button>
    </div>
  );
}

export default RouterHooks;
