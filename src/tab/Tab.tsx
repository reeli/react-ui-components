import { isFunction } from "lodash";
import React, { ReactElement } from "react";
import { css } from "@emotion/react";

interface ITabProps {
  activeIdx?: number;
  getActiveIdx?: (activeIdx?: number) => void;
  toggleable?: boolean;
  children: ReactElement[];
}

interface ITabGroupProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export class TabGroup extends React.Component<ITabGroupProps, any> {
  render() {
    const { header } = this.props;
    return (
      <div>
        <div>{header}</div>
        {this.props.children}
      </div>
    );
  }
}

const tabHeadersStyles = css({
  display: "flex",
  width: "50%",
});

const headerStyles = css({
  flex: 1,
});

export class Tab extends React.Component<ITabProps, any> {
  state = {
    activeIdx: this.props.activeIdx,
  };

  toggle(currentIdx?: number) {
    return currentIdx !== this.state.activeIdx && currentIdx;
  }

  handleClick = (currentIdx: number) => {
    this.setState(
      {
        activeIdx: this.props.toggleable ? this.toggle(currentIdx) : currentIdx,
      },
      () => {
        if (this.props.getActiveIdx && isFunction(this.props.getActiveIdx)) {
          this.props.getActiveIdx(this.state.activeIdx);
        }
      },
    );
  };

  render() {
    const { activeIdx } = this.state;
    return (
      <div>
        <div css={tabHeadersStyles}>
          {React.Children.map(this.props.children, (child: React.ReactChild, index) => {
            return (
              <div
                onClick={() => this.handleClick(index)}
                css={[
                  headerStyles,
                  {
                    color: index === activeIdx ? "red" : "black",
                  },
                ]}
              >
                {React.isValidElement<ITabGroupProps>(child) && child.props.header}
              </div>
            );
          })}
        </div>
        <div>
          {React.Children.map(this.props.children, (child: React.ReactChild, index) => {
            return React.isValidElement<ITabGroupProps>(child) && this.state.activeIdx === index
              ? child.props.children
              : null;
          })}
        </div>
        {/*{React.Children.toArray(this.props.children)[activeIdx].props.children}*/}
      </div>
    );
  }
}
