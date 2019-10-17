import React from "react";

interface IScoreProps {
  scores: number;
}

export class Score extends React.PureComponent<IScoreProps> {
  render() {
    return <div>Scores: {this.props.scores}</div>;
  }
}
