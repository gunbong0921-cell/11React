import { useState, useEffect } from "react";

function MoveBox(props) {
  console.log('Lifecycle==>1. 컴포넌트 실행(함수 호출)');
  
  const [position, setPosition] = useState(props.initPosition);
  const [leftCount, setLeftCount] = useState(1);
  const boxStyle = {
    backgroundColor: 'red',
    position: 'relative',
    textAlign: 'center',
    width: '100px',
    height: '100px',
    margin: '10px',
    lineHeight: '100px',
    left: position.x,
  }
}