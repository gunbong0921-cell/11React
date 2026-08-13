import useStudentStore from './useStudentStore';

//학생을 표현하는 컴포넌트, 아이디, 이름, 출석여부를 매개변수로 받는다. 
const StudentUnit = ({id, name, isHere}) => {
  //상태저장소에서 deleteStudent, toggleAttendance 함수를 구조분해해서 가져온다. 
  const {deleteStudent, toggleAttendance} = useStudentStore();
  //출력할 이름의 스타일 지정. 출석여부에 따라 취소선, 텍스트의 색깔을 결정한다. 
  let nameStyle = {
    textDecoration: isHere ? 'line-through' : 'none',
    color: isHere ? 'gray' : 'black', cursor: 'pointer',
  };

  return (
    <li>
      {/* 학생의 이름을 클릭하면 출석상태를 토글한다. */}
      {/* 삭제 버튼은 confirm 창을 띄워서 삭제 여부를 확인한다. */}
      <span style={nameStyle} onClick={() => toggleAttendance(id)}>{name}</span>
      <button onClick={() => {
        if(window.confirm('삭제하시겠습니까?')) {
          deleteStudent(id);
        }
      }}>삭제</button>
    </li>
  );
};

export default StudentUnit;