import { useRef, useState } from 'react';

export default function Stopwatch() {
  const [timerFlag, setTimerFlag] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  let timerRef = useRef();
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTickCount((prev) => prev + 1);
    }, 1000);
  }
  const stopTimer = () => {
    clearInterval(timerRef.current);
  }
  
  return (<>
    <div className="stopwatch">
      <h1 className="h1">StopWatch</h1>
      <span className="stopwatch-time">{tickCount}</span>
      <button onClick={()=>{setTimerFlag(!timerFlag); (timerFlag===true) ? stopTimer(): startTimer();}}>{(timerFlag===false) ? 'Start' : 'Stop'}</button>
      <button onClick={()=>{ if(timerFlag===true){ alert('stopwatch가 동작중입니다.'); } else { setTickCount(0); }}}>Reset</button>
    </div>
  </>);
}
