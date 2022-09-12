interface IScoreProps {
  scores: number;
}

export function Score(props: IScoreProps) {
  return <div>Scores: {props.scores}</div>;
}
