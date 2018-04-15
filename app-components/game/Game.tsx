import { css } from "glamor";
import * as React from "react";
import { Word } from "./Word";

const containerStyles = css({
  width: "400px",
  height: "600px",
  border: "1px solid #ccc",
  position: "relative",
  backgroundColor: "#7080E6",
});


interface IWord {
  id: string;
  origin: string;
  target: string;
}

interface IGameData {
  words: IWord[];
  interferences: string[]
}

export class Game extends React.Component<any, any> {
  state = {
    isStart: false,
  }

  render() {
    return (
      <div>
        <div {...containerStyles}>
          {this.state.isStart
            ? <Word text='Hello' step={10} />
            : null}
        </div>
        <button onClick={() => {
          this.setState({
            isStart: true,
          });
        }}>start
        </button>
        <button onClick={() => {
          this.setState({
            isStart: false,
          });
        }}>end
        </button>
      </div>
    )
  }
}
