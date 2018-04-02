import { Component } from 'react';
import { findDOMNode } from 'react-dom';

interface IPositionProps {
  children: (position: ClientRect | null) => JSX.Element | null;
  content?: () => JSX.Element | null;
}

export class Position extends Component<IPositionProps, any> {
  private ele: Element | null = null;
  state = {
    position: null,
  };

  componentDidMount() {
    this.ele = findDOMNode(this);
    this.setState({
      position: this.ele.getBoundingClientRect(),
    }, () => {
      document.body.addEventListener('wheel', this.updatePosition);
      document.body.addEventListener('resize', this.updatePosition);
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener('wheel', this.updatePosition);
    document.body.removeEventListener('resize', this.updatePosition);
  }

  updatePosition = () => {
    if (this.ele) {
      this.setState({
        position: this.ele.getBoundingClientRect(),
      });
    }
  }

  render() {
    return this.props.children(this.state.position);
  }
}
