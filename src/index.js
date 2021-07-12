import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { ToastProvider, DefaultToast } from "react-toast-notifications";

const MyCustomToast = ({ children, ...props }) => {
  return (
    <DefaultToast {...props}>
      <div dangerouslySetInnerHTML={{ __html: children }} />
    </DefaultToast>
  );
};

ReactDOM.render(
  <ToastProvider components={{ Toast: MyCustomToast }} placement="top-right">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ToastProvider>,
  document.getElementById("root")
);
