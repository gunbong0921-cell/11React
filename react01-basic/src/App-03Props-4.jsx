function MyComponent({p1, p3}) {

  return (<>
    <h2>props 구조분해할당</h2>
    <p>
      {p1}, {p3}
    </p>
    </>)
}
function App() {
  return (<>
    <MyComponent p1={"HTML5"} p2={"CSS3"} p3={"JavaScript"} p4={"jQuery"} />
  </>)
}

export default App
