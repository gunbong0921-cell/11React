import { create } from 'zustand';

const usePlayerStore = create((set) => ({
  title: 'Scoreboard',
  players: [
    {idx: 1, name: '홍길동', score: 10},
    {idx: 2, name: '손오공', score: 20},
    {idx: 3, name: '유비', score: 30},
    {idx: 4, name: '달타냥', score: 40},
  ],
  nextVal : 5,
  addPlayerProcess: (pname) => {
    //console.log('추가', pname);
    set((state) => ({
      players: [...state.players, {idx: state.nextVal, name: pname, score: 0}],
      nextVal: state.nextVal + 1,
    }));
  },

  scoreUpdateProcess: (flag, pIdx) => {
    //console.log('점수변경', flag, pIdx);
    let changeScore = (flag==='+') ? 5 : -5;
    set((state) => ({
      players: state.players.map((row) => {
        return (row.idx === pIdx) ? {...row, score: row.score + changeScore} : row;
      }),
    }));
  },
  deletePlayerProcess: (pIdx) => {
    //console.log('삭제', pIdx);
    if(confirm('정말 삭제하시겠습니까?')) {
      set((state) => ({
        players: state.players.filter(row => row.idx !== pIdx),
      }));
    }
  },
  editPlayerProcess: (pIdx, pName) => {
    //console.log('수정', pIdx, pName);
    set((state) => ({
      players: state.players.map((row) => {
        return (row.idx === pIdx) ? {...row, name: pName} : row
      })
    }));
  },
}));

export default usePlayerStore;
