import { useRef } from 'react';

const TestForm = () => {
  const formRef = useRef(null);

  async function sendTest(formData) {
    /**
    매개변수 formData는 폼값을 담고 있는 객체이다.
     */
    console.log('폼값', formData.get('message'));
    formRef.current.reset();
  }

  return (
    <>
      <h2>formData.get() 함수로 폼값 처리하기</h2>
      {/* 폼값을 sumit하면 action 함수를 호출하고 폼값을 초기화 */}
      <form action={sendTest} ref={formRef}>
        <input type="text" name="message" />
        <input type="submit" value="전송하기" />
      </form>
    </>
  );
};

export default TestForm;
