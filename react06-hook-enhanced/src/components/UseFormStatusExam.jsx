import { useFormStatus } from 'react-dom';
import { useState } from 'react';

//이름을 받은 후 1초후 완료메세지를 반환해주는 비동기 함수 정의 
async function submitForm(formData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`"${formData.get('name')}" 님의 요청이 완료되었습니다.`);
    }, 1000);
  });
}

//제출 버튼 컴포넌트 정의 
const SubmitButton = () => {
  /**
  pending : 비동기 작업 진행 중인지 여부를 나타내는 불리언 값
  data : 비동기 작업의 결과를 저장하는 값
  method : 폼 제출 방법(POST, PUT, DELETE 등)
  action : 폼 제출 시 실행할 액션 함수
   */
  const { pending, data, method, action } = useFormStatus();
  console.log('data', data);
  console.log('method', method);
  console.log('action', action);
  return (
    //padding의 상태에 따라 버튼을 비활성화 하거나 텍스트를 변경
    //특히 버튼이 비활성화되면 사용자가 버튼을 클릭할 수 없게 함
    <button type="submit" disabled={pending}>
      {pending ? '제출중...' : '제출'}
    </button>
  );
};

const UseFormStatusExam = () => {
  //메세지를 저장하는 상태 변수 
  const [message, setMessage] = useState('');

  //폼 제출 시 실행할 액션 함수 정의 
  const handleSubmit = async (formData) => {
    //전송된 폼데이터를 submitForm 함수에 전달하고 결과를 받음
    const result = await submitForm(formData);
    setMessage(result);
  };

  return (
    <>
      <h2>useFormStatus 사용하기</h2>
      <form action={handleSubmit}>
        <label>
          {/* required 속성은 사용자가 이름을 입력하지 않으면 폼을 제출할 수 없게 함 */}
          이름 : <input type="text" name="name" required />
        </label>
        <SubmitButton />
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default UseFormStatusExam;
