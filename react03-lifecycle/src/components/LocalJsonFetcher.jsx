import { useState, useEffect } from 'react';

//목록을 출력하는 컴포넌트 
const GlobalTop = (props) => {
  console.log('1.컴포넌트실행');
  /**
  목록의 데이터로 사용할 스테이트 생성. 초기값은 빈 배열로 설정. 차후 useEffect()가 실행되면 Json파일의
  내용을 읽어와서 값을 변경한다. 
   */
  const [myList, setMyList] = useState([]);

  //이 컴포넌트가 1차 랜더링된 후 실행되는 훅 
  useEffect(() => {
    console.log('3.useEffect실행');
    //프로젝트 내부에 있는 json파일을 get 방식으로 요청 
    fetch('/json/myData.json')
    .then((result) => {
      /**
      요청에 성공하면 json파일의 데이터가 매개변수 result를 통해 반환된다. 반환된 데이터는 Text형식이므로
      JSON 포맷으로 변환된 후 반환된다.
       */
      return result.json();
    })
    .then((json) => {
      /**
      첫번째 then절에서 반환한 값은 두번째 then절로 반환된다. 이 값을 받은 후 데이터로 사용할 스테이트를 
      변경한다. 이때 리랜더링이 된다. 
       */
      console.log(json);
      setMyList(json);
    });
  }, []);
  /**
  useEffect()의 두번째 인자인 의존성배열에 빈 배열을 추가한다. 이렇게 하면 최초 한번만 실행되고, 그 이상 
  실행되지 않는다. 만약 의존성 배열을 생략하면 무한히 반복 로딩되는 현상이 발생된다. useEffect()내부에서
  스테이트(상태)를 변경하는 코드가 있기 때문이다. 
   */
  /**
  최초 실행에서는 myList가 빈 페이지이므로 아무런 내용도 출력되지 않는다. 따라서 틀만 만들어진 상태로 랜더링된다.
  그러나 useEffect()가 실행되면 myList에 데이터가 저장되므로 데이터가 출력된다. 
   */
  let listTag = myList.map((data) => {
    return (
      <li key={data.id}>
        {/* data-id 속성에 설정된 값은 합성이벤트 객체의 target속성 하위의 dataset.id를 통해 읽어올 수 있다.
        이 속성에 게시물의 일련번호인 num을 설정하고 있다. */}
        <a href={data.id} data-id={data.num} onClick={(e) => {
          e.preventDefault();
          //여기서 게시물의 일련번호를 부모컴포넌트로 전달한다. 
          props.myLinkClick(e.target.dataset.id);
        }}>
          {data.id}
        </a>
      </li>
    );
  });
  console.log('2.return실행(rendering)');
  return (
    <nav>
      <ul>
        {listTag}
      </ul>
    </nav>
  );
}

//프롭스로 전달받은 객체의 값을 화면에 출력하는 컴포넌트 
const ConntentBody = (props) => {
  return (
    <div>
      <h2>{props.myResult.name}</h2>
      <ul>
        <li>num : {props.myResult.num}</li>
        <li>id : {props.myResult.id}</li>
        <li>cell : {props.myResult.cell}</li>
        <li>description : {props.myResult.description}</li>
      </ul>
    </div>
  );
}

function LocalJsonFetcher() {
  //dto.json의 내용을 저장할 스테이트 생성 
  const [myResult, setMyResult] = useState({});
  return (<>
    <h2>내부 서버 통신</h2>
    {/* 클릭시 프로젝트 내부에 저장된 dto.json파일을 get방식으로 요청한 후 콜백데이터를 받아오는
    기능의 함수를 정의한 후 프롭스로 전달한다. 자식 컴포넌트는 이 함수를 호출할때 게시물의 일련번호를 
    인수로 전달한다. */}
    <GlobalTop myLinkClick={(num) => {
      console.log('클릭', num);
      fetch(`/json/dto`+num+'.json')
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        //JSON파일의 내용으로 스테이트를 변경하고 리랜더링
        setMyResult(json);
      });
    }} />
    {/* 상태변수 myResult가 프롭스를 통해 자식으로 전달된다. */}
    <ConntentBody myResult={myResult} />
  </>
  );
}
export default LocalJsonFetcher;