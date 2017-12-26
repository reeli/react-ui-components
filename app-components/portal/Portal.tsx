import * as React from 'react';
import { createPortal } from 'react-dom';

export class BasePortal extends React.Component<any, any> {
  defaultNode: any;

  componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  render() {
    if (!this.defaultNode) {
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }

    return createPortal(this.props.children, this.defaultNode);
  }
}

type TChildren<T> = (innerProps: T) => JSX.Element | null;

interface IPortalInnerProps {
  open: () => any;
  close: () => any;
  portal: () => JSX.Element | null;
}

interface IPortalProps {
  render: () => JSX.Element;
  children: TChildren<IPortalInnerProps>;
}

export class Portal extends React.Component<IPortalProps, any> {
  state = {
    open: false,
  };

  wrapContentWithPortal = () => {
    if (this.state.open) {
      return <BasePortal>{this.props.render()}</BasePortal>;
    }
    return null;
  };

  openPortal = () => {
    this.setState({
      open: true,
    });
  };

  closePortal = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    if (typeof this.props.children !== 'function') {
      return null;
    }
    return this.props.children({
      open: this.openPortal,
      close: this.closePortal,
      portal: this.wrapContentWithPortal,
    });
  }
}
