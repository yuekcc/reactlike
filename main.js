import { h, mount } from "@/reactlike";
import { useState } from "@/reactlike/hooks";
import { List } from "./List";

import "./style.css";

const Button = () => {
  const [counter, setCounter] = useState(1);
  const [name] = useState("click me");
  return h(
    "button",
    { onclick: () => setCounter(counter + 1) },
    `${name} ${counter}`
  );
};

const HelloWorld = ({ message }) => {
  return h("h1", null, message);
};

const mockApiCall = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const RemoteCall = () => {
  const [data, setData] = useState(null);

  const callApi = () => {
    setData("start remote call ...");
    mockApiCall().then(() => {
      setData("Remote call done");
    });
  };

  return h("button", { onclick: callApi }, data || `Remote Call`);
};

const App = () =>
  h("div", { class: "app" }, [
    h(HelloWorld, { message: "hello, world" }, null),
    h("div", null, [h(Button), h(RemoteCall)]),
    h("div", null, [
      h("span", null, "button list, use jsx"),
      h(List, { data: [1, 2, 3, 4, 5, 7, 8] }),
    ]),
  ]);

mount(App, document.getElementById("app"));
