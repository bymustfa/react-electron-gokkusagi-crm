import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles/style.scss";

import {
  HomePage,
  CustomersPage,
  VisitsPage,
  ActivitiesPage,
  TasksPage,
  CalendarPage,
  OrdersPage,
  UsersPage,
  ParametersPage,
  BulutfonPage,
  LoginPage,
} from "./pages";

function App() {
  return (
    <main style={{ minHeight: "100%" }}>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/customers" component={CustomersPage} exact />
        <Route path="/visits" component={VisitsPage} exact />
        <Route path="/activities" component={ActivitiesPage} exact />
        <Route path="/tasks" component={TasksPage} exact />
        <Route path="/calendar" component={CalendarPage} exact />
        <Route path="/orders" component={OrdersPage} exact />
        <Route path="/users" component={UsersPage} exact />
        <Route path="/parameters" component={ParametersPage} exact />
        <Route path="/santral" component={BulutfonPage} exact />
      </Switch>
    </main>
  );
}

export default App;
