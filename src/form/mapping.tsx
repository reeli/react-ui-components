import { ButtonProps, Button, TextField, Select } from "@material-ui/core";
import { FC, forwardRef, Ref } from "react";
import { Widget as TWidget } from "./types";

const MyButton: FC<ButtonProps & { text: string }> = forwardRef(({ text, ...others }, ref: Ref<HTMLButtonElement>) => {
  return (
    <Button {...others} ref={ref} variant={"contained"} color={"primary"}>
      {text}
    </Button>
  );
});

export const getWidgetComponentByType = (type: TWidget["widget"]) => {
  const mapping: {
    [key: string]: FC<any>;
  } = {
    text: TextField,
    select: Select,
    submit: MyButton,
  };

  return mapping[type];
};
