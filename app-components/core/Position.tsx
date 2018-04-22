import { isEqual } from 'lodash';
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
    this.setState(
      {
        position: this.ele.getBoundingClientRect(),
      },
      () => {
        document.body.addEventListener('wheel', this.updatePosition);
        window.addEventListener('resize', this.updatePosition);
      },
    );
  }

  componentWillUnmount() {
    document.body.removeEventListener('wheel', this.updatePosition);
    window.removeEventListener('resize', this.updatePosition);
  }

  getPosition(ele: Element) {
    const eleClientRect = ele.getBoundingClientRect();
    const bodyClientRect = document.body.getBoundingClientRect();
    return {
      height: eleClientRect.height,
      width: eleClientRect.width,
      bottom: eleClientRect.bottom - bodyClientRect.bottom,
      top: eleClientRect.top - bodyClientRect.top,
      left: eleClientRect.left - bodyClientRect.left,
      right: eleClientRect.right - bodyClientRect.right,
    };
  }

  updatePosition = () => {
    if (this.ele && !isEqual(this.getPosition(this.ele), this.state.position)) {
      this.setState({
        position: this.getPosition(this.ele),
      });
    }
  };

  render() {
    return this.props.children(this.state.position);
  }
}
