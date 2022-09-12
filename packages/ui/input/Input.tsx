import { ChangeEvent, FocusEvent, forwardRef, KeyboardEvent, MouseEvent } from "react";
import { css } from "@emotion/react";

interface IInputProps<TValue = string> {
  name: string;
  value?: string;
  onChange?: (evt: ChangeEvent<HTMLInputElement>, value: TValue) => void;
  onBlur?: (evt: FocusEvent<HTMLInputElement>, value: TValue) => void;
  onEnter?: (evt: KeyboardEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "checkbox" | "radio";
  onClick?: (evt: MouseEvent<HTMLInputElement>, value: TValue) => void;
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
  (
    {
      name,
      type = "text",
      value,
      placeholder = "",
      onChange,
      onBlur,
      onEnter,
      onClick,
      readOnly = false,
      autoFocus = false,
    },
    ref,
  ) => {
    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(evt, evt.target.value);
    };

    const handleClick = (evt: MouseEvent<HTMLInputElement>) => {
      if (onClick) {
        const value = (evt.target as HTMLInputElement).value;
        onClick(evt, value);
      }
    };

    const handleBlur = (evt: FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(evt, evt.target.value);
    };

    const handleKeyUp = (evt: KeyboardEvent<HTMLInputElement>) => {
      if (evt.key === "Enter") {
        onEnter && onEnter(evt);
      }
    };

    return (
      <input
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onClick={handleClick}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={ref}
        autoFocus={autoFocus}
        autoComplete={"off"}
        css={[inputStyles, { cursor: readOnly ? "pointer" : "default" }]}
        onKeyUp={handleKeyUp}
      />
    );
  },
);
