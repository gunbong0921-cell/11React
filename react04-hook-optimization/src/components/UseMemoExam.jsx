import { useMemo, useState } from 'react';

/**
매개변수로 전달되는 숫자가 소수인지 판단하는 함수. 소수란? 특정숫자를 나눌 수 있는 값이
1과 자신밖에 없는 정수를 뜻함.
 */
const isPrime = (num) => {
  console.log('소수판단중..');
  // 12억번 반복하는 반복문 정의 
  for (let exCost = 1; exCost < 1234567890; exCost++) {}
  //실행 비용이 높은 연산으로 가정
  //아래 로직은 소수인지 판단하는 코드 
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const UseMemoExam = () => {
  //상태 변수 생성
  const [number, setNumber] = useState(1);
  const [text, setText] = useState('');

  //step1 : useMemo 미사용 → number/text 변경 시마다 매번 재계산
  /**
  소수인지 판단하는 함수를 실행한 후 boolean 타입의 ㄱ밧을 반환하게된다. 하지만 소수판단과
  전혀 상관이 없는 이름을 입력하는 부분에서도 이 함수가 실행되므로 애플리케이션의 성능저하가 발생된다.
  즉 새로운 랜더링은 컴포넌트로 정의한 함수가 실행되는 것이므로 이 코드는 랜더링 될때마다 실행되는 코드이다. 
   */
  //const checkPrime = isPrime(number);

  //step2 : useMemo 사용 → number가 바뀔 때만 재계산
  /**
  실행비용이 높은 함수를 호출하는 부분을 useMemo()로 감싸서 메모이제이션한다. 이 값은 number의 값이 변경될때만
  함수를 재호출 하게되므로, 문자를 입력할때는 실행되지 않는다. 즉 랜더링 시 불필요한 함수가 실행되는것을 차단하게
  되므로 애플리케이션의 성능이 향상된다.
   */
  const checkPrime = useMemo(() => isPrime(number), [number]);

  return (
    <>
      <h2>useMemo 사용하기</h2>
      {/* 정수를 입력해서 소수인지 판단하기 위한 입력상자 */}
      <input
        type="number"
        value={number}
        placeholder="소수 판단할 숫자 입력"
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <p>
        정수 {number}는 {checkPrime ? '소수 O' : '소수 X'}
      </p>

      {/* 텍스트를 입력하는 입력상자 */}
      <input
        type="text"
        value={text}
        placeholder="이름 입력(소수 판단과 무관)"
        onChange={(e) => setText(e.target.value)}
      />
      <p>입력한 이름: {text}</p>
    </>
  );
};

export default UseMemoExam;
