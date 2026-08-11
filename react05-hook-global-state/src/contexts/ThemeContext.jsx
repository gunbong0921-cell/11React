import { createContext, useState } from 'react';

//전역 상태 관리를 위해 컨텍스트 객체 생성
export const ThemeContext = createContext();

//데이터 제공을 위한 프로바이더 객체 생성
//프로바이더가 감싸고 있는 하위의 자식 컴포넌트를 children이라는 이름으로 전달받는다.
export const ThemeProvider = ({ children }) => {
  //화면의 테마를 관리하기 위한 상태변수. 초기값은 false로 지정.
  const [isDark, setIsDark] = useState(false);
  //화면의 테마를 토글하기 위한 함수 선언.
  const toggleTheme = () => setIsDark(prev => !prev);
  return (
    <>
    {/* 컨텍스트를 이용해서 프로바이더를 생성한다. value 속성으로 자식 컴포넌트로 제공할 데이터를 지정한다.
    그러면 하위의 모든 자식 컴포넌트에서 useContext 훅을 통해 이 데이터를 참조할 수 있다. */}
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
    </>
  );
}

export default ThemeProvider;