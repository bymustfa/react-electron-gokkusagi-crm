import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles/style.scss";

import Home from "./pages/Home";
import Customers from "./pages/Customers";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/customers" component={Customers} exact />
      </Switch>
    </main>
  );
}

export default App;
