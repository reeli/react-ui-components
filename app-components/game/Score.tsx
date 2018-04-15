import * as React from "react";

interface IScoreProps {
  scores: number;
}

export class Score extends React.PureComponent<IScoreProps> {
  render() {
    return <div>{this.props.scores}</div>
  }
}