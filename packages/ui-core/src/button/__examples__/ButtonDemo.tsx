import { Button } from "../Button";

export function ButtonDemo() {
  return (
    <div>
      <Button onClick={() => console.log("hello")}>button1</Button>
      <Button>button2</Button>
    </div>
  );
}
