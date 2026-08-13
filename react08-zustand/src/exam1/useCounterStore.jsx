//상태저장소 생성을 위해 create 함수를 import
import {create} from 'zustand';

//상태저장소 생성. set,get 함수를 인자로 받는다.
const useCounterStore = create((set,get)=>({
  //상태변수 생성 및 초기화 
  count: 0,
  //상태 변경을 위한 함수 정의 
  increment: () => {
    //get() 함수를 사용하여 현재 상태값을 가져온다.
    const current = get().count;
    if(current >= 10){
      alert('최대값은 10입니다.');
      return;
    }
    //set() 함수를 사용하여 상태값을 변경한다.
    set({count: current + 1});
  },
  //카운트 감소 함수 정의
  decrement: () => {
    const current = get().count;
    if(current <= 0){
      alert('최소값은 0입니다.');
      return;
    }
    set({count: current - 1});
  },
  //카운트 초기화 함수 정의
  reset: () => set({count: 0})
}));

export default useCounterStore;