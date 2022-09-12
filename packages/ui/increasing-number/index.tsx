import React from "react";
import { isEqual,isNumber } from "lodash";

interface IIncreasingNumberInnerProps {
  totalNumber: number;
  totalTime?: number; // default unit is ms
  speed?: number;
}

interface IIncreasingNumberProps extends IIncreasingNumberInnerProps {
  children: (props: { increasingNumber: number }) => React.ReactNode;
}

export class IncreasingNumber extends React.Component<IIncreasingNumberProps, any> {
  state = {
    number: 0,
  };

  private timer: any;
  private changingNumber: number = 0;

  componentDidMount() {
    this.createTimer(this.props);
  }

  createTimer(props: IIncreasingNumberProps) {
    if (!props.totalNumber) {
      return;
    }
    this.timer = setInterval(() => this.increaseAnimate(props), 10);
  }

  componentWillReceiveProps(nextProps: IIncreasingNumberProps) {
    if (isNumber(nextProps.totalNumber) && !isEqual(this.props.totalNumber, nextProps.totalNumber)) {
      this.setState(
        {
          number: 0,
        },
        () => {
          this.changingNumber = 0;
          this.clearTimer();
          this.createTimer(nextProps);
        },
      );
    }
  }

  increaseAnimate = ({ totalNumber, totalTime, speed }: IIncreasingNumberProps) => {
    const time = totalTime || 1000;
    const animationSpeed = speed || 10;
    const step = (totalNumber / time) * animationSpeed;

    this.changingNumber = this.changingNumber + step;
    if (this.changingNumber >= totalNumber) {
      clearInterval(this.timer);
      this.timer = undefined;
      this.changingNumber = totalNumber;
    }
    this.setState({
      number: Math.floor(this.changingNumber),
    });
  };

  componentWillUnmount() {
    this.clearTimer();
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  render() {
    return this.props.children({
      increasingNumber: this.state.number,
    });
  }
}
