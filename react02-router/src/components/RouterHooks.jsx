import { useLocation, useSearchParams } from 'react-router-dom';

/**
useLocation 
  : React router를 통해 라우팅 처리된 페이지에서 현재 URL(경로)과 관련된 정보를
  얻는데 사용하는 훅. URL경로, 쿼리스트링의 정보를 제공한다.
useSearchParams
  : React router를 통해 라우팅 처리된 페이지에서 쿼리스트링의 정보를 얻는데 사용하는 훅.
  쿼리스트링의 정보를 객체 형태로 제공한다. 현재 URL의 쿼리스트링을 조회하거나 변경할 수 있다.
 */
const RouterHooks = () => {
  //별도의 인수없이 변수 선언 
  const location = useLocation();
  /**
  쿼리스트링의 정보를 얻어와서 저장하기 위한 변수와 파라미터변경을 위하여 함수로 정의한다.
   */
  const [searchParams, setSearchParams] = useSearchParams();
  /**
  쿼리스트링에서 파라미터를 얻어온다. 첫 진입시에는 둘다 null이다. 조직을 위한 함수를 실행하면 
  설정된 값을 읽어올 수 있다.
   */
  const mode = searchParams.get('mode');
  const pageNum = searchParams.get('pageNum');

  //파라미터 mode의 값을 토글하는 함수
  const changeMode = () => {
    //삼항연산자를 통해 list와 view로 토글할 값을 설정 
    const nextMode = mode === 'list' ? 'view' : 'list';
    /**
    파라미터 변경을 위한 setter 함수를 실행한다. pageNum의 경우 값이 지정되지 않았으므로 기존의 값을 유지한다.
     */
    setSearchParams({ mode: nextMode, pageNum });
  }
  /**
  ES6에서는 객체 생성시 key와 value가 일치하면 하나의 값만 기술하면된다.
  {pageNum: pageNum} => {pageNum}과 같이 쓸수 있다.
   */

  //다음페이지로 이동하기 위한 파라미터 조작 함수
  const nextPage = () => {
    /**
    페이지번호가 nnull이거나 없는 상태라면 1로 지정하고, 값이 있는 경우라면 +1로 시켜준다.
     */
    let pageTemp = (pageNum===null || isNaN(pageNum)) ? 1 : parseInt(pageNum) + 1;
    //페이지번호는 1~10 사이로 고정한다.
    if (pageTemp > 10) pageTemp = 10;
    //mode는 고정된 상태에서 pageNum만 변경한다.
    setSearchParams({ mode, pageNum: pageTemp });
  }
  //이전페이지로 이동 
  const prevPage = () => {
    let pageTemp = (pageNum===null || isNaN(pageNum)) ? 1 : parseInt(pageNum) - 1;
    //페이지번호는 1~10 사이로 고정한다. (음수 방지)
    if (pageTemp < 1) pageTemp = 1;
    setSearchParams({ mode, pageNum: pageTemp });
  }
  return (
    <div>
      <h3>Router 관련 Hook</h3>
      <ul>
        {/* 
        useLocation 훅을 통해 얻어온 location 객체의 속성 중 pathname과 search를 출력한다.
          pathname : 현재 페이지의 경로
          search : 현재 페이지의 쿼리스트링
        */}
        <li>URL : {location.pathname}</li>
        <li>QueryString : {location.search}</li>
        <li>Mode : {mode}</li>
        <li>PageNum : {pageNum}</li>
      </ul>
      {/* 버튼에 함수 연결시에는 이벤트리스너에 함수명만 붙여주면 된다. */}
      <button type="button" onClick={changeMode}>Mode 변경</button>
      <button type="button" onClick={nextPage}>다음 Page</button>
      <button type="button" onClick={prevPage}>이전 Page</button>
    </div>
  );
}

export default RouterHooks;

//퀴즈] nextPage(), prevPage() 함수 실행시 페이지를 1~10으로 고정하는 기능을 추가하시오. 
// 현재는 버튼을 계속 누르는 경우 페이지번호가 음수가 된다. 

