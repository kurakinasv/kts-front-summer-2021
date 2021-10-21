import React from "react";

import ReactDOM from "react-dom";

import "regenerator-runtime";
import "./index.css";
import App from "./App/App";
import "./config/configureMobX";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
