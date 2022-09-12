import { useButton } from "@mui/base";
import { styled } from "@mui/system";
import { FC, forwardRef, ReactNode } from "react";
import clsx from "clsx";
import { capitalize } from "lodash";
import { ButtonBaseProps } from "@material-ui/core";

const colors: any = {
  primary: "#1976d2",
  secondary: "rgba(25, 118, 210, 0.5)",
  success: "green",
  error: "red"
};

const MuiButtonRoot = styled("button")((ownerState: MuiOwnerState) => {
  return {
    border: "none",
    borderRadius: 6,
    padding: 8,
    fontSize: 12,
    display: "inline-flex",
    verticalAlign: "middle",
    alignItems: "center",
    cursor: "pointer",
    ...(ownerState.disabled && {
      opacity: 0.5,
      cursor: "not-allowed"
    }),
    ...(ownerState.fullWidth && {
      width: "100%"
    }),
    ...(ownerState.variant === "contained" && {
      backgroundColor: colors[ownerState.color || "primary"],
      color: "#fff",
      ["&:hover"]: {
        textDecoration: "none",
        backgroundColor: "rgb(21, 101, 192)"
      },
      ["&:active"]: {
        boxShadow: "rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px"
      }
      // ["&:focus-visible"]: {
      //   backgroundColor: "black",
      //   "outline": "none"
      // },
    }),
    ...(ownerState.variant === "outlined" && {
      border: `1px solid ${colors[ownerState.color || "primary"]}`,
      backgroundColor: "rgb(244, 250, 255)",
      ["&:hover"]: {
        textDecoration: "none",
        border: "1px solid rgb(25, 118, 210)",
        backgroundColor: "rgba(25, 118, 210, 0.04)"
      }
    }),
    ...(ownerState.variant === "text" && {
      color: `${colors[ownerState.color || "primary"]}`,
      background: "none",
      ["&:hover"]: {
        textDecoration: "none",
        backgroundColor: "rgba(25, 118, 210, 0.04)"
      }
    }),
    ...(ownerState.size === "large" && {
      fontSize: "1.5rem",
      padding: "7px 21px",
      lineHeight: 1.75
    }),
    ...(ownerState.size === "medium" && {
      fontSize: "1.4rem",
      padding: "5px 15px",
      lineHeight: 1.75
    }),
    ...(ownerState.size === "small" && {
      fontSize: "1.3rem",
      padding: "3px 9px",
      lineHeight: 1.75
    })
  };
});

const ButtonStartIcon = styled("span")({
  display: "inherit",
  marginRight: 8
  // marginLeft: -4
});

const ButtonEndIcon = styled("span")({
  display: "inherit",
  marginLeft: 8
  // marginRight: -4
});

interface MuiButtonProps extends ButtonBaseProps {
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text",
  color?: "primary" | "secondary" | "success" | "error",
  size?: "large" | "medium" | "small",
  startIcon?: ReactNode,
  endIcon?: ReactNode
}

interface MuiOwnerState extends MuiButtonProps{
}

export const MuiButton: FC<MuiButtonProps> = forwardRef((props, ref) => {
  const { children, variant = "contained", size = "medium", startIcon, endIcon } = props;
  const { active, disabled, focusVisible, getRootProps } = useButton({
    ...props,
    ref
  });

  const classes = {
    active,
    disabled,
    focusVisible,
    [`variant${capitalize(variant)}`]: true,
    [`${size}`]: true,
    fullWidth: props.fullWidth
  };

  return <MuiButtonRoot {...props} {...getRootProps()}
                        className={clsx(classes)}>
    {startIcon && <ButtonStartIcon>{startIcon}</ButtonStartIcon>}
    {children}
    {endIcon && <ButtonEndIcon>{endIcon}</ButtonEndIcon>}
  </MuiButtonRoot>;
});


