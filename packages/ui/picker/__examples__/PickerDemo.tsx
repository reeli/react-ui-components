import React, { useEffect } from "react";
import { PickerView } from "../PickerView";
import { DatePickerView } from "../DatePickerView";

const list = new Array(20).fill("").map((_s, idx) => {
  return {
    label: `test value${idx}`,
    value: `${idx}`,
  };
});

export const PickerDemo = () => {
  useEffect(() => {
    window.addEventListener("scroll", (evt) => {
      console.log(evt);
    });

    document.documentElement.addEventListener("click", (evt) => {
      console.log(evt.target, evt.clientX, evt.clientY, (evt.target as HTMLElement).getAttribute("role"), "click");
    });
  }, []);

  return (
    <div
      onMouseDown={() => {
        console.log(" down");
      }}
      onMouseUp={() => {
        console.log(" up");
      }}
      onClick={() => {
        console.log(" clicked");
      }}
      onMouseEnter={() => {
        console.log(" enter");
      }}
      onMouseLeave={() => {
        console.log(" leave");
      }}
      onMouseOver={() => {
        console.log(" over");
      }}
    >
      test
    </div>
  );
};

export class PickerDemo1 extends React.Component<any, any> {
  state = {
    value: list[0].value,
  };

  render() {
    return (
      <PickerView
        options={list as any}
        onChange={(v) => {
          console.log(v, "v");
          this.setState({ value: v });
        }}
        value={this.state.value}
      />
    );
  }
}

export class PickerDemo2 extends React.Component<any, any> {
  state = {
    value: new Date(2012, 0, 20),
  };

  render() {
    return (
      <DatePickerView
        value={this.state.value}
        onChange={(value) => {
          console.log(value, "selected date");
          this.setState({
            value,
          });
        }}
      />
    );
  }
}

