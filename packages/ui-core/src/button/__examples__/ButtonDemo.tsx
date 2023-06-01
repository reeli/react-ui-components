import { Button } from "../Button";
import { Box } from "@ui/base";
import { Icon } from "../../Icon";

import { mdiAutorenew, mdiPlus } from "@mdi/js";

export function ButtonDemo() {
  return (
    <Box component={"div"} sx={{ display: "flex", gap: 10 }}>
      <Button onClick={() => console.log("hello")}>button1</Button>
      <Button onClick={() => console.log("good")} data-disabled={true}>
        button2
      </Button>
      <Button onClick={() => console.log("good")}>
        <Icon path={mdiPlus} placement={"start"} />
        Button3
        <Icon path={mdiAutorenew} placement={"end"} />
      </Button>
    </Box>
  );
}
