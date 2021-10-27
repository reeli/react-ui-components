import React, { FC } from "react";
import { render } from "react-dom";

const Hello: FC = ({ children }) => {
  return (
    <div role={"child0"}>
      hello
      <div>
        good
        <div key={"0"} role={"child1"}>
          123
        </div>
        <div key={"1"} role={"child2"}>
          12345678
        </div>
        {children}
      </div>
    </div>
  );
};

const Good = () => {
  return <div role={"good"}>good</div>;
};

class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        demo
        <Hello testid-root={"hello"}>
          <Good testid-root={"good1"} />
          <Good />
        </Hello>
      </div>
    );
  }
}

console.log(App);

render(<App />, document.getElementById("app"));
