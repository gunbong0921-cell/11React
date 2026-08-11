import { useContext } from 'react';
import { ThemeContext, ThemeProvider } from '../contexts/ThemeContext';
import ThemedBox from '../contexts/ThemedBox';

//테마 변경을 위한 버튼 컴포넌트 
const ThemeToggleButton = () => {
  //useContext 훅을 통해 테마 관리를 위한 컨텍스트 객체에서 제공하는 데이터를 가져온다.
  const { toggleTheme } = useContext(ThemeContext);
  //버튼을 클릭하면 toggleTheme 함수를 호출하여 테마를 전환한다.
  return (
    <button onClick={toggleTheme}>
      테마 전환
    </button>
  );
};

const UseContextExam = () => {
  return (
    <>
    <h2>useContext 사용하기</h2>
    {/* 프로바이더 컴포넌트로 데이터를 공유할 자식 컴포넌트를 감싸준다. children 속성에 전달된 
    컴포넌트들은 프로바이더 컴포넌트에서 제공하는 데이터를 참조할 수 있다. */}
    <ThemeProvider>
      <ThemeToggleButton />
      <ThemedBox />
    </ThemeProvider>
    </>
  );
};

export default UseContextExam;
