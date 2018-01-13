import * as React from 'react';
import { createPortal, findDOMNode } from 'react-dom';

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
  open: (e: any) => void;
  close: (e: any) => void;
  toggle: (e: any) => void;
}

interface IPortalProps {
  children: TChildren<IPortalInnerProps>;
  triggerOn: (props: any) => any;
  onOutSideClick?: boolean;
}

export class Portal extends React.Component<IPortalProps, any> {
  private portal: React.Component | null;
  state = {
    open: false,
  };

  componentDidMount() {
    if (this.props.onOutSideClick) {
      document.body.addEventListener('click', this.handleBodyClick);
    }
  }

  handleBodyClick = (e: any) => {
    if (this.portal) {
      const node = findDOMNode(this.portal);
      if (!node.contains(e.target)) {
        this.handleOutSideClick(e);
      }
    }
  };

  handleOutSideClick(e: any) {
    this.closePortal(e);
  }

  wrapContentWithPortal = () => {
    if (this.state.open) {
      return (
        <BasePortal ref={portal => (this.portal = portal)}>
          {this.props.children({
            open: this.openPortal,
            close: this.closePortal,
            toggle: this.togglePortal,
          })}
        </BasePortal>
      );
    }
    return null;
  };

  openPortal = (e: any) => {
    e.stopPropagation();
    this.setState(
      {
        open: true,
      },
      () => {},
    );
  };

  closePortal = (e: any) => {
    e.stopPropagation();
    this.setState(
      {
        open: false,
      },
      () => {
        this.portal = null;
      },
    );
  };

  togglePortal = (e: any) => {
    this.state.open ? this.closePortal(e) : this.openPortal(e);
  };

  render() {
    if (typeof this.props.children !== 'function') {
      return null;
    }
    return (
      <div>
        {this.props.triggerOn({
          open: this.openPortal,
          close: this.closePortal,
          toggle: this.togglePortal,
        })}
        {this.wrapContentWithPortal()}
      </div>
    );
  }
}
