import { Button } from "../Button";
import { Box } from "@ui/base";

export function ButtonDemo() {
  return (
    <Box component={"div"} sx={{ display: "flex", gap: 10 }}>
      <Button onClick={() => console.log("hello")}>button1</Button>
      <Button onClick={() => console.log("good")} disabled>
        button2
      </Button>
      <Button onClick={() => console.log("good")} disabled>
        Button3
        <div>icon</div>
      </Button>
    </Box>
  );
}
