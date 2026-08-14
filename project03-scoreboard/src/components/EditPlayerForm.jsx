import {useState} from 'react';
import usePlayerStore from '../zustand/usePlayerStore';

export default function EditPlayerForm({pIdx, pName, setShowEdit}) {
  const {editPlayerProcess} = usePlayerStore();
  const [playerName, setPlayerName] = useState(pName);
  return (<>
    <form className="editform" 
      onSubmit={(e)=>{
        e.preventDefault();
        editPlayerProcess(pIdx, playerName);
        setShowEdit(false);
      }
    }>
      <input type="text" name="player" className="editInput" 
        placeholder="이름을 추가하세요" value={playerName} 
        onChange={(e)=>{setPlayerName(e.target.value)}} />
      <input type="submit" className="editInput" value="수정하기" />
    </form>
  </>);
}
