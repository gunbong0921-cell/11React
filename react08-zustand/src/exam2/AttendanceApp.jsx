import {useState} from 'react';
import useStudentStore from './useStudentStore';
import StudentUnit from './StudentUnit';

export default function AttendanceApp(){
  const [name, setName] = useState('');
  const {students, count, addStudent} = useStudentStore();

  return (
    <>
    <h2>출결관리APP</h2>
    <p>총 학생수: {count}</p>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="학생이름을 입력하세요." />
    <button onClick={() => {
      if(name.trim() !== '') {
        addStudent(name);
        setName('');
      }
    }}>추가</button>
    <ol>
      {students.map(student => (
        <StudentUnit key={student.id} {...student} />
      ))}
    </ol>
    </>
  );
}