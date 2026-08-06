import {useState} from 'react';

//작성폼을 컴포넌트 정의 
function WriteForm(props) {
  return (<>
    {/* sumit 이벤트 리스너에서 폼값 처리 */}
    <form onSubmit={(e)=>{
      /**
      이벤트 리스너는 SyntheticEvent(합성이벤트) 객체를 매개변수로 사용할 수 잇다. React가 제공되는
      이벤트객체는 브라우저의 이벤트객체의 종류와 상관없이 일관된 이벤트 인터페이스를 제공한다.
       */
      console.log("합성이벤트객체", e);
      e.preventDefault(); 
      //이벤트객체의 target 속성을 통해 제출된 폼값을 읽어온다
      let gubun = e.target.gubun.value;
      let title = e.target.title.value;
      //부모컴포넌트에서 프롭스로 전달받은 함수를 호출해서 폼값 전송 
      props.writeAction(gubun, title);
    }}>
      <select name="gubun">
        <option value="front">프론트엔드</option>
        <option value="back">백엔드</option>
      </select>
      <input type="text" name="title" />
      <input type="submit" value="추가" />
    </form>    
    </>
  )
}

function App() {
  //상태변수 생성. 
  const [message, setMessage] = useState('폼값 검증 진행중');
  return (
    <>
    <div>
      <h2>React-Form</h2>
      {/* 작성폼 컴포넌트 추가. 프롭스를 통해 함수 전달 */}
      <WriteForm writeAction={(gu, ti)=>{
        //매개변수 2개 정의. 입력한 폼값을 받기 위한 용도 
        console.log("Form 값", gu, ti);
        //모든 폼값이 입력되었을때 구문 실행 
        if(gu!='' && ti!=''){
          //템플릿 리터럴을 이용해서 문자열 생성 
          let frmValue = `검증 완료 폼값 : ${gu} ${ti}`;
          //생성된 문자열을 통해 상태변수를 변경하고, UI를 리렌더링 해서 화면을 변경한다.
          setMessage(frmValue);
        } else {
          //폼값 중 하나라도 비어있으면 경고 메시지 출력 
          alert('빈값 있음');
        }
      }}/>
      {/* 최초 상태에는 '폼값 검증 진행중'으로 표시되고, 폼값이 전송되어 state가 변경되면 리렌더링 
      되어 내용이 변경된다. */}
      <p>{message}</p>
    </div>
    </>
  )
}

export default App

