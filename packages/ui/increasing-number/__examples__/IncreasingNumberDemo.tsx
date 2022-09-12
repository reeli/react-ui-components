import { IncreasingNumber } from "../index";

export function IncreasingNumberDemo() {
  return (
    <IncreasingNumber totalNumber={100} totalTime={10000}>
      {({ increasingNumber }) => <div>{increasingNumber}</div>}
    </IncreasingNumber>
  );
}
