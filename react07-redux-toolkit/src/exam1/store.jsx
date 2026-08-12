//스토어 생성을 위한 함수 임포트 
import {configureStore} from '@reduxjs/toolkit';
//슬라이스 임포트
import counterReducer from './counterSlice';

//스토어 생성 및 익스포트 
export const store = configureStore({
  //상태변경을 위한 리듀서 함수 등록 
  reducer: {
    myCounter: counterReducer,
  },
});

export default store;