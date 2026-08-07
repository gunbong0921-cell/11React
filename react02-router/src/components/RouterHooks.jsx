import { useLocation, useSearchParams } from 'react-router-dom';

const RouterHooks = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const pageNum = searchParams.get('pageNum');

  const changeMode = () => {
    const nextMode = mode === 'list' ? 'view' : 'list';
    setSearchParams({ mode: nextMode, pageNum });
  }

  const nextPage = () => {
    let pageTemp = (pageNum===null || isNaN(pageNum)) ? 1 : parseInt(pageNum) + 1;
    setSearchParams({ mode, pageNum: pageTemp });
  }

  const prevPage = () => {
    let pageTemp = (pageNum===null || isNaN(pageNum)) ? 1 : parseInt(pageNum) - 1;
    setSearchParams({ mode, pageNum: pageTemp });
  }
  return (
    <div>
      <h3>Router 관련 Hook</h3>
      <ul>
        <li>URL : {location.pathname}</li>
        <li>QueryString : {location.search}</li>
        <li>Mode : {mode}</li>
        <li>PageNum : {pageNum}</li>
      </ul>
      <button type="button" onClick={changeMode}>Mode 변경</button>
      <button type="button" onClick={nextPage}>다음 Page</button>
      <button type="button" onClick={prevPage}>이전 Page</button>
    </div>
  );
}

export default RouterHooks;
