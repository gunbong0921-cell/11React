import { useMemo, useState } from 'react';

/**
useMemo()
  : 비용이 큰 연산 결과를 메모이제이션하여, 의존성 값이 바뀔 때만 다시 계산한다.
 */
function hardCalculate(number) {
  console.log('복잡한 계산 실행');
  for (let i = 0; i < 999999999; i++) {}
  return number + 10000;
}

function easyCalculate(number) {
  console.log('간단한 계산 실행');
  return number + 1;
}

function UseMemoExam() {
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

  // hardNumber가 변경될 때만 hardCalculate 재실행
  const hardSum = useMemo(() => hardCalculate(hardNumber), [hardNumber]);
  const easySum = easyCalculate(easyNumber);

  return (
    <div>
      <h2>useMemo 예제</h2>
      <h3>복잡한 계산</h3>
      <input
        type="number"
        value={hardNumber}
        onChange={(e) => setHardNumber(parseInt(e.target.value))}
      />
      <span> + 10000 = {hardSum}</span>

      <h3>간단한 계산</h3>
      <input
        type="number"
        value={easyNumber}
        onChange={(e) => setEasyNumber(parseInt(e.target.value))}
      />
      <span> + 1 = {easySum}</span>
    </div>
  );
}

export default UseMemoExam;
