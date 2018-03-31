import { Component } from 'react';
import { findDOMNode } from 'react-dom';

interface IPositionProps {
  children: (position: ClientRect | null) => JSX.Element | null;
  content?: () => JSX.Element | null;
}

export class Position extends Component<IPositionProps, any> {
  state = {
    position: null,
  };

  componentDidMount() {
    this.setState({
      position: findDOMNode(this).getBoundingClientRect(),
    });
  }

  render() {
    return this.props.children(this.state.position);
  }
}
