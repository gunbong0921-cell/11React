import { useOptimistic, useState, useRef } from 'react';

async function deliverMessage(message) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return message;
}

function Thread({ messages, sendMessage }) {
  const formRef = useRef(null);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  async function formAction(formData) {
    const message = formData.get('message');
    addOptimisticMessage(message);
    formRef.current.reset();
    await sendMessage(message);
  }

  return (
    <>
      {optimisticMessages.map((msg, index) => (
        <div key={index}>
          {msg.text}
          {!!msg.sending && <small> (sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="메시지를 입력하세요" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

const UseOptimisticExam = () => {
  const [messages, setMessages] = useState([
    { text: '기본 메시지 입니다', sending: false, key: 1 },
  ]);

  async function sendMessage(message) {
    const sentMessage = await deliverMessage(message);
    setMessages(prev => [...prev, { text: sentMessage, sending: false }]);
  }

  return (
    <div>
      <h2>useOptimistic 사용하기</h2>
      <Thread messages={messages} sendMessage={sendMessage} />
    </div>
  );
};

export default UseOptimisticExam;
