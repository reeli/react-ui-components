import React, { forwardRef } from "react";
import { css } from "@emotion/react";

interface IInputProps {
  value?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>, value: any) => any;
  type?: "text" | "number" | "checkbox" | "radio";
  onClick?: (evt: React.MouseEvent<HTMLInputElement>, value: any) => any;
  placeholder?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
}

const inputStyles = css({
  position: "relative",
  borderWidth: "0 0 1px 0",
  fontSize: "15px",
  padding: "5px 1px",
  width: "100%",
  color: "#00AF66",
  textShadow: "0px 0px 0px #000",
  background: "transparent",
  boxSizing: "border-box",
  marginTop: "14px",
});

// 基础组件最好都加上 forwardRef，如果不加很可能出错。
// Input 这里必须使用 forwardRef，是因为当用做 OverlayTrigger 的 children 时，需要通过 HTMLElement 去计算 clientRect。
export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ type = "text", value, placeholder = "", onChange, onClick, readOnly = false, autoFocus = false }, ref) => {
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(evt, evt.target.value);
    };

    const handleClick = (evt: React.MouseEvent<HTMLInputElement>) => {
      if (onClick) {
        const value = (evt.target as HTMLInputElement).value;
        onClick(evt, value);
      }
    };

    return (
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={ref}
        autoFocus={autoFocus}
        css={[inputStyles, { cursor: readOnly ? "pointer" : "default" }]}
      />
    );
  },
);
