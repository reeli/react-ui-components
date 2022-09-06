import { IconChecked } from "./assets/IconChecked";
import { IconUnchecked } from "./assets/IconUnchecked";
import { css } from "@emotion/react";

interface ICheckboxProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  label?: string | number;
}

const defaultOnChange = (_: boolean) => {};

export function Checkbox(props: ICheckboxProps) {
  const { value = false, label, onChange = defaultOnChange } = props;
  return (
    <label css={checkboxWrapperStyles}>
      <div css={inputWrapper}>
        {value ? <IconChecked /> : <IconUnchecked />}
        <input type="checkbox" checked={value} onChange={() => onChange(!value)} css={inputStyles} />
      </div>
      {label && <span css={labelStyles}>{label}</span>}
    </label>
  );
}

const checkboxWrapperStyles = css({
  display: "flex",
  alignItems: "center",
});

const inputWrapper = css({
  position: "relative",
  width: "24px",
  height: "24px",
});

const inputStyles = css({
  width: 0,
  height: 0,
  visibility: "hidden",
});

const labelStyles = css({
  marginLeft: ".2rem",
  display: "inline-block",
});
