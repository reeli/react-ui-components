import { Demo } from "style-guide/components/Demo";
import { MuiButton } from "../MuiButton";
import {AccessAlarm} from "@material-ui/icons"
// import { InputUnstyled } from "@mui/base";
// import { Checkbox, FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";

export function MuiButtonDemo() {
  return (
    <Demo title={"Button"}>
      <div css={{ width: 400, }}>
        <MuiButton  variant={"contained"} size={"small"} startIcon={<AccessAlarm fontSize={"small"}/>}>本人</MuiButton>
        <MuiButton  variant={"contained"} size={"medium"} endIcon={<AccessAlarm fontSize={"medium"}/>}>子女</MuiButton>
        <MuiButton  variant={"contained"} color={"primary"}
                    onClick={() => alert("hello")} size={"large"} endIcon={<AccessAlarm fontSize={"large"}/>}>子女</MuiButton>
      </div>
      <div css={{ width: 400, }}>
        <MuiButton  variant={"outlined"} >本人</MuiButton>
        <MuiButton  variant={"contained"} >子女</MuiButton>
        <MuiButton  variant={"text"}
                    onClick={() => alert("hello")} size={"large"}>子女</MuiButton>
      </div>
      <div css={{ width: 400, }}>
        <MuiButton  variant={"text"} color={"primary"}>本人</MuiButton>
        <MuiButton  variant={"text"} color={"secondary"}>子女</MuiButton>
        <MuiButton  variant={"text"} color={"success"} >子女</MuiButton>
        <MuiButton  variant={"text"} color={"error"} >子女</MuiButton>
      </div>
      <div css={{ width: 400, }}>
        <MuiButton  variant={"text"} color={"primary"} disabled>本人</MuiButton>
        <MuiButton  variant={"text"} color={"secondary"}>子女</MuiButton>
        <MuiButton  variant={"text"} color={"success"} >子女</MuiButton>
        <MuiButton  variant={"text"} color={"error"} >子女</MuiButton>
      </div>
      {/*<Checkbox/>*/}
      {/*<InputUnstyled type={"date"}/>*/}
      {/*<FormControl>*/}
      {/*  <InputLabel htmlFor="my-input">Email address</InputLabel>*/}
      {/*  <Input id="my-input" aria-describedby="my-helper-text"/>*/}
      {/*  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>*/}
      {/*</FormControl>*/}
      {/*<FormControl>*/}
      {/*  <InputLabel htmlFor="my-input">Email address</InputLabel>*/}
      {/*  <Input id="my-input" aria-describedby="my-helper-text"/>*/}
      {/*  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>*/}
      {/*</FormControl>*/}
    </Demo>
  );
}
