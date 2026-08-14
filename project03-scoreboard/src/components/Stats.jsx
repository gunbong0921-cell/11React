import usePlayerStore from '../zustand/usePlayerStore';

export default function Stats(props) {
  const {players} = usePlayerStore();
  return (<>
    <table className="stats">
      <tbody>
      <tr>
        <td>총인원수 :</td>
        <td>{players.length}</td>
      </tr>
      <tr>
        <td>점수합계 :</td>
        <td>{players.reduce((total, player) => total + player.score, 0)}</td>
      </tr>
      </tbody>
    </table>    
  </>);
}

  