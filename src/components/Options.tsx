import React from "react";

export function Options() {
  return <h1>Hello world!</h1>;
}
import ReactDOM from "react-dom";
import { Tabs } from "./Tabs";

const app = document.getElementById("app");
ReactDOM.render(<Tabs />, app);
