import "index.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import store from "./reducers/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "font-awesome/css/font-awesome.min.css";
import App from "App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

//reportWebVitals();
