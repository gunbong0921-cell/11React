import {create} from 'zustand';
//미들웨어 임포트
import {persist, devtools} from 'zustand/middleware';
/**
persist: 상태를 브라우저의 로컬 스토리지에 저장해서 새로고침해도 상태가 유지된다.
devtools: 상태 변화를 크롬 확장프로그램에 표시해준다.
 */

//미들웨어 형식에 맞춘 사용자 정의 로깅 함수 
const logger = (config) => (set, get, api) =>
  /**
  set() 함수를 호출하면 상태가 변경되고, get() 함수를 호출하면 현재 상태값을 가져올 수 있다.
   */ 
  config((...args) => {
    //...args는 모든 인자를 배열로 받는다.
    //콘솔에 로그를 출력한다.
    console.log('[Zustand 로그]', ...args);
    //set() 함수를 호출하여 상태를 변경한다.
    set(...args);
    },
    //get, api 함수를 호출하여 현재 상태값과 상태 변경 함수를 가져올 수 있다.
    get, api
  );

/**
상태저장소 생성 시 3가지의 미들웨어를 적용하기 위해 전체 함수를 감싸준다. 
 */  
// Chrome Redux DevTools 확장프로그램과 연결
// https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
const useStudentStore = create(
  devtools( //devtools 시작 (가장 바깥 → 크롬 확장프로그램이 상태 변화를 추적)
    logger( //logger 시작
      persist( //persist 시작
        (set) => ({
          //데이터로 사용할 객체형 배열 
          students: [{id: Date.now(), name: '성유겸', isHere: false}],
          //학생이름과 출결 여부를 관리하는 변수
          //학생수
          count: 1,
          //학생추가. 추가할 학생의 이름을 매개변수로 받아서 상태를 변경한다. 
          addStudent: (name) => 
            //변경함수. (state) => newState 형식으로 상태를 변경한다.
            set(state => ({
              //기존 학생 목록에 새로운 학생을 추가한다.
              //스프레드 연산자를 사용하여 기존 학생 목록을 복사하고, 새로운 학생을 추가한다.
              students: [...state.students, {id: Date.now(), name, isHere: false}],
              //학생수를 1 증가시킨다.
              count: state.count + 1,
              //전체 교체여부로 true면 상태를 변경하고, false면 부분병합으로 상태를 변경한다.
              //addStudent 액션이 호출되었음을 표시한다. 보통은 함수명과 동일하게 사용한다. 
            }), false, 'addStudent'),
            //학생삭제. 삭제할 학생의 id를 매개변수로 받아서 상태를 변경한다. 
          deleteStudent: (id) =>
            //매개변수로 전달된 id와 일치하지 않는 학생들만 필터링하여 새로운 배열을 생성한다.
            set(state => ({
              students: state.students.filter(student => student.id !== id),
              //학생수를 1 감소시킨다. 
              count: state.count - 1,
            }), false, 'deleteStudent'),
            //학생출결 토글. 토글할 학생의 id를 매개변수로 받아서 상태를 변경한다. 
          toggleAttendance: (id) => 
            //출석상태를 표현한 isHere 값을 토글한다. 
            set(state => ({
              students: state.students.map(student => student.id === id ? {...student, isHere: !student.isHere} : student),
            }), false, 'toggleAttendance'),
          }),
          //persist 미들웨어에서 사용할 이름
          {name: 'student-storage',}
        ) //persist 끝
      ), //logger 끝
      {
        name: 'studentStore',
        enabled: true,
        trace: true,
      }
    ) //devtools 끝
  );

export default useStudentStore;
