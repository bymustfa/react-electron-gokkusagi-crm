import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/style.bundle.min.css";
import Home from "./pages/Home";
import Order from "./pages/Order";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/siparis" component={Order} exact />
      </Switch>
    </main>
  );
}

export default App;
