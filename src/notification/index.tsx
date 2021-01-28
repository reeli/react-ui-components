import { render } from "react-dom";

const createNotification = () => {
  if (!document.getElementById("notification-container")) {
    const ele = document.createElement("div");
    ele.setAttribute("id", "notification-container");
    document.body.appendChild(ele);
  }
  return render(<div>test</div>, document.getElementById("notification-container"));
};

setTimeout(() => {
  console.log("setup");
  createNotification();
}, 3000);
