import {useState} from 'react';
import useStudentStore from './useStudentStore';
import StudentUnit from './StudentUnit';

export default function AttendanceApp(){
  //입력상자를 위한 상태변수와 함수를 생성. 
  const [name, setName] = useState('');
  //상태저장소에서 students, count, addStudent 함수를 구조분해해서 가져온다. 
  const {students, count, addStudent} = useStudentStore();

  return (
    <>
    <h2>출결관리APP</h2>
    <p>총 학생수: {count}</p>
    {/* 학생이름 입력상자와 추가버튼을 추가. 입력값이 변경될 때마다 setName 함수를 호출하여 상태를 업데이트한다. */}
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="학생이름을 입력하세요." />
    {/* 추가버튼을 클릭하면 입력값이 비어있지 않은 경우에만 addStudent 함수를 호출하여 학생을 추가한다. 입력값을 초기화한다. */}
    <button onClick={() => {
      //입력값이 비어있지 않은 경우에만 학생을 추가한다. 
      if(name.trim() !== '') {
        addStudent(name);
        //입력값을 초기화한다. 
        setName('');
      }
    }}>추가</button>
    <ol>
      {/* 학생목록을 출력. StudentUnit 컴포넌트를 사용하여 각 학생을 표현한다. */}
      {students.map(student => (
        <StudentUnit key={student.id} {...student} />
      ))}
    </ol>
    </>
  );
}