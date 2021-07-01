import React, { useEffect, useState } from "react";
import { Toast } from "src/notification/Toast";
import { render } from "react-dom";

type Observer = (...args: any[]) => any;

class Subject {
  observers: Observer[];

  constructor() {
    this.observers = [];
  }

  subscribe(callback: Observer) {
    this.observers.push(callback);

    return () => {
      this.observers = this.observers.filter((cb) => cb !== callback);
    };
  }

  // next need to send data to every observer
  next(data: any) {
    this.observers.forEach((observer) => {
      observer(data);
    });
  }
}

const sub$ = new Subject();

const div = document.createElement("div");
document.body.appendChild(div);
div.setAttribute("id", "messages");

const Message = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const unsub = sub$.subscribe((data) => {
      setMsg(data);
    });
    return () => {
      unsub();
    };
  }, []);

  if (!msg) {
    return null;
  }

  return (
    <Toast
      duration={1000}
      onClose={() => {
        setMsg("");
      }}
    >
      {msg}
    </Toast>
  );
};

render(<Message />, document.querySelector("#messages"));

export const sendMessage = (message: string) => sub$.next(message);
