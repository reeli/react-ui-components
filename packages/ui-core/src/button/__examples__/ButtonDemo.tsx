import { Button } from "../Button";

export function ButtonDemo() {
  return (
    <div>
      <Button onClick={() => console.log("hello")}>button1</Button>
      <Button onClick={() => console.log("good")} disabled>
        button2
      </Button>
    </div>
  );
}
