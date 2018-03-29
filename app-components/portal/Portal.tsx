import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { isFunction } from 'util';

class BasePortal extends React.Component<{ children: JSX.Element | null }, any> {
  node: HTMLElement;

  componentWillUnmount() {
    if (this.node) {
      document.body.removeChild(this.node);
    }
  }

  render() {
    if (!this.node) {
      this.node = document.createElement('div');
      document.body.appendChild(this.node);
    }

    return ReactDOM.createPortal(this.props.children, this.node);
  }
}

interface IPortalPropsInnerProps {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

type TChildrenRender<T> = (innerProps: T) => JSX.Element | null;

interface IPortalProps {
  triggerOn: TChildrenRender<IPortalPropsInnerProps>;
  children: TChildrenRender<IPortalPropsInnerProps>;
  isOpen?: boolean;
  beforeClose?: (resetPortal: () => void) => void;
}

interface IPortalState {
  isOpen: boolean;
}

export class Portal extends Component<IPortalProps, IPortalState> {
  state = {
    isOpen: this.props.isOpen || false,
  };

  componentWillReceiveProps(nextProps: IPortalProps) {
    if (typeof nextProps.isOpen !== 'undefined') {
      if (nextProps.isOpen && !this.state.isOpen) {
        this.open();
      } else if (!nextProps.isOpen && this.state.isOpen) {
        this.close();
      }
    }
  }

  open = () => {
    this.setState({
      isOpen: true,
    });
  };

  close = () => {
    const resetPortal = () => {
      this.setState({
        isOpen: false,
      });
    };
    if (this.props.beforeClose && isFunction(this.props.beforeClose)) {
      this.props.beforeClose(resetPortal);
    } else {
      resetPortal();
    }
  };

  toggle = () => {
    this.state.isOpen ? this.close() : this.open();
  };

  renderPortal() {
    if (this.state.isOpen) {
      return (
        <BasePortal>
          {this.props.children({
            open: this.open,
            close: this.close,
            toggle: this.toggle,
          })}
        </BasePortal>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.props.triggerOn
          ? this.props.triggerOn({
              open: this.open,
              close: this.close,
              toggle: this.toggle,
            })
          : null}
        {this.renderPortal()}
      </div>
    );
  }
}
