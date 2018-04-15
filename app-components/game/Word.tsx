import { css } from "glamor";
import * as React from "react";

interface IWordProps {
  text: string;
  step: number;
  timeSpace?: number;
  initPosition: {
    top: number;
    left: number;
  };
  clientHeight: number;
  outOfStage: (isOutOfStage: boolean) => void;
}

interface IWordState {
  top: number;
  left: number;
}

const wordContainerStyles = css({
  position: "absolute",
});

const wordStyles = css({
  padding: "10px 20px",
  borderRadius: "5px",
  color: "blue",
  backgroundColor: "#fff",
  textAlign: "center",
  maxWidth: "200px",
});

export class Word extends React.PureComponent<IWordProps, IWordState> {
  state = {
    top: this.props.initPosition.top,
    left: this.props.initPosition.left,
  };

  componentDidMount() {
    this.setMove();
  }

  setMove() {
    const { timeSpace = 1000 } = this.props;
    setTimeout(() => {
      this.move();
    }, timeSpace)
  }

  move() {
    const { step = 10 } = this.props;
    if (this.state.top > 0 && this.state.top < this.props.clientHeight && this.props.outOfStage) {
      this.props.outOfStage(false);
    }
    if (this.state.top <= this.props.clientHeight) {
      this.setState(prevState => ({
        ...prevState,
        top: this.state.top + step,
      }), () => {
        this.setMove();
      });
    }
  }

  render() {
    return this.state.top > this.props.clientHeight
      ? null
      : (
        <div {...css(wordContainerStyles, { top: this.state.top, left: this.state.left })}>
          <div {...wordStyles}>{this.props.text}</div>
        </div>
      );
  }
}