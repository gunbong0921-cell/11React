import usePlayerStore from '../zustand/usePlayerStore';

export default function Counter(props) {
  const {scoreUpdateProcess} = usePlayerStore();
  return (<>
    <div className="counter">
      <button className="counter-action decrement"
        onClick={() => { scoreUpdateProcess('-', props.idx); }}> -</button>
      <span className="counter-score">{props.score}</span>
      <button className="counter-action increment"
        onClick={() => { scoreUpdateProcess('+', props.idx); }}> +</button>
    </div>
  </>);
}