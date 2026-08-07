import { Outlet } from 'react-router-dom';

const CommonLayout = () => {
  return (
    <div>
      <header style={{ backgroundColor: 'lightgray', padding: '10px' }}>
        Outlet 컴포넌트 알아보기
      </header>
      <article>
        {/* 각 페이지에 해당하는 컴포넌트가 삽입될 위치에 Outlet을 설정한다. */}
        <Outlet />
      </article>
      <footer style={{ backgroundColor: 'lightgray', padding: '10px' }}>
        공통 레이아웃
      </footer>
    </div>
  );
};

export default CommonLayout;
