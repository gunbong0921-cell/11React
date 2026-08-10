import { useState, useEffect } from 'react';

function RandomUser(props) {
  /**
  외부 서버의 API를 이용해서 얻어온 데이터를 저장할 상태변수 생성. 초기값은 JSON 포맷에 
  따라 달라질 수 있으므로 확인 후 설정.
   */
  const [myJSON, setMyJSON] = useState({results: []});

  //컴포넌트 랜더링이 완료된 후 API 정보를 얻어온다.
  useEffect(function() {
    //모든 태그의 랜더링이 완료된 후 API 정보를 JSON으로 얻어온다.
    fetch('https://api.randomuser.me/?results=10')
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      console.log(json);
      //상태변수를 변경해서 화면을 리랜더링한다. 
      setMyJSON(json);
    });
  }, []);
  /**
  의존성 배열은 빈 배열로 설정하여, 최초 한번만 실행되도록 한다. 이 설정이 없으면 무한루프에 빠지게된다.
   */

  //API통해 얻어온 User의 정보를 반복해서 <tr> 태그를 생성하여 반환한다.
  let trTag = myJSON.results.map((data) => {
    return (
      //tr태그에는 중복되지 않는 key props 설정
      <tr key={data.login.md5}>
        {/* 프로필 이미지, 이름, 아이디 등의 정보 파싱 후 출력 */}
        <td><img src={data.picture.thumbnail} alt={data.login.username} /></td>
        <td><a href="/" onClick={(e) => {
          e.preventDefault();
          /**
          아이디를 클릭하면 프롭스로 전달받은 함수를 통해 현재 루프의 객체를 그대로 인자로 전달한다.
           */
          props.onprofile(data);
        }}>{data.login.username}</a></td>
        <td>{data.name.title} {data.name.first} {data.name.last}</td>
        <td>{data.nat}</td>
        <td>{data.email}</td>
      </tr>
    );
  });

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>사진</th>
            <th>로그인</th>
            <th>이름</th>
            <th>국가</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {trTag}
        </tbody>
      </table>
    </div>
  );
}

function ExternalApiFetcher() {
  return (
    <>
      <h2>외부 서버 통신</h2>
      {/* 링크를 클릭하면 User의 정보를 alert 창으로 띄워주기 위한 프롭스를 전달한다. */}
      <RandomUser onprofile={(sData) => {
        console.log(sData);
        //템플릿 리터럴을 통해 +기호없이 문자열을 하나로 연결해서 출력 
        let info = `전화번호:${sData.cell}
성별:${sData.gender}
username:${sData.login.username}
password:${sData.login.password}`;
        alert(info);
      }} />
    </>
  );
}

export default ExternalApiFetcher;
