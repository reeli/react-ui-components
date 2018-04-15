import { css } from "glamor";
import * as React from "react";
import * as ReactDOM from "react-dom";

interface IWordProps {
  text: string;
  step?: number;
  timeSpace?: number;
}

interface IWordState {
  top: number;
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
  node: HTMLElement | null = null;

  state = {
    top: 0,
  };

  componentDidMount() {
    const clientRect = this.getClientRect();
    this.setState({
      top: clientRect.top - clientRect.height,
    });
  }

  getClientRect() {
    this.node = ReactDOM.findDOMNode(this) as HTMLElement;
    return this.node.getBoundingClientRect() as ClientRect;
  }

  componentDidUpdate() {
    const { step = 10, timeSpace = 1000 } = this.props;
    setTimeout(() => {
      this.setState({
        top: this.state.top + step,
      });
    }, timeSpace);
  }

  render() {
    return (
      <div {...css(wordContainerStyles, { top: this.state.top })}>
        <div {...wordStyles}>{this.props.text}</div>
      </div>
    );
  }
}