import * as React from "react";
import { Component, ReactInstance } from "react";
import * as ReactDOM from "react-dom";
import { findDOMNode } from "react-dom";
import { isFunction } from "lodash";

class BasePortal extends React.Component<{ children: JSX.Element | null }, any> {
  node?: HTMLElement;

  componentWillUnmount() {
    if (this.node) {
      document.body.removeChild(this.node);
    }
  }

  render() {
    if (!this.node) {
      this.node = document.createElement("div");
      document.body.appendChild(this.node);
    }

    return ReactDOM.createPortal(this.props.children, this.node);
  }
}

export interface IPortalPropsInnerProps {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

type TChildrenRender<T> = (innerProps: T) => React.ReactNode;

export interface IPortalProps {
  content: TChildrenRender<IPortalPropsInnerProps>;
  children: TChildrenRender<IPortalPropsInnerProps>;
  isOpen?: boolean;
  onOpenChanged?: (isOpen: boolean) => void;
  beforeClose?: (resetPortal: () => void) => void;
  closeOnOutSide?: boolean;
}

interface IPortalState {
  isOpen: boolean;
}

export class Portal extends Component<IPortalProps, IPortalState> {
  portal: ReactInstance | null = null;
  state = {
    isOpen: this.props.isOpen || false,
  };

  componentDidMount() {
    if (this.props.closeOnOutSide) {
      document.body.addEventListener("click", this.handleOutSideClick);
    }
  }

  componentWillUnmount() {
    if (this.props.closeOnOutSide) {
      document.body.removeEventListener("click", this.handleOutSideClick);
    }
  }

  componentWillReceiveProps(nextProps: IPortalProps) {
    if (typeof nextProps.isOpen !== "undefined") {
      if (nextProps.isOpen && !this.state.isOpen) {
        this.open();
      } else if (!nextProps.isOpen && this.state.isOpen) {
        this.close();
      }
    }
  }

  componentWillUpdate(nextProps: IPortalProps, nextState: IPortalState) {
    if (nextState.isOpen !== nextProps.isOpen && nextProps.onOpenChanged) {
      nextProps.onOpenChanged(nextState.isOpen);
    }
  }

  handleOutSideClick = (evt: any) => {
    if (this.portal) {
      const node = findDOMNode(this.portal);
      if (!node.contains(evt.target) && !findDOMNode(this).contains(evt.target)) {
        this.close();
      }
    }
  };

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
        <BasePortal
          ref={portal => {
            this.portal = portal;
          }}
        >
          {this.props.content({
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
      <>
        {this.props.children
          ? this.props.children({
              open: this.open,
              close: this.close,
              toggle: this.toggle,
            })
          : null}
        {this.renderPortal()}
      </>
    );
  }
}
