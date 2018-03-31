import { css } from 'glamor';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import {
  OverlayTrigger,
  Placement,
} from '../core/OverlayTrigger';

interface ITooltipsProps {
  children: JSX.Element | null | string;
  width?: string
  content?: string | JSX.Element | null
  placement?: Placement,
}

const tooltipsStyles = css({
  position: 'absolute',
  zIndex: 1000,
  padding: '8px 0',
});

const tooltipsInnerStyles = css({
  backgroundColor: '#4a4a4a',
  color: '#fff',
  fontSize: '14px',
  padding: '.3rem',
});

const arrowUp = css({
  position: 'absolute',
  top: 0,
  left: '10%',
  marginLeft: '-5px',
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent',
  borderBottom: '8px solid #4a4a4a',
  width: 0,
  height: 0,
});


export class Tooltips extends React.Component<ITooltipsProps, any> {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    const tooltipTrigger = findDOMNode(this);
    tooltipTrigger.addEventListener('mouseenter', this.show);
    tooltipTrigger.addEventListener('mouseleave', this.hide);
  }

  componentWillUnmount() {
    const tooltipTrigger = findDOMNode(this);
    tooltipTrigger.removeEventListener('mouseenter', this.show);
    tooltipTrigger.removeEventListener('mouseleave', this.hide);
  }

  show = () => {
    this.setState({
      isOpen: true,
    });
  };

  hide = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { width, content, children, placement } = this.props;
    return (
      <OverlayTrigger
        content={() => (
          <div {...css(tooltipsStyles, { width })}>
            <div {...arrowUp} />
            <div {...tooltipsInnerStyles}>{content}</div>
          </div>
        )}
        placement={placement}
        isOpen={this.state.isOpen}
      >
        {() => {
          return <>{children}</>;
        }}
      </OverlayTrigger>
    );
  }
}
