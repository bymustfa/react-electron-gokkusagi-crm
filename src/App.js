import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles/style.scss";

import { ProtectedRoute } from "./app/protected.route";

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
        <Route path="/login" component={LoginPage} exact />

        <ProtectedRoute path="/" component={HomePage} exact />
        <ProtectedRoute path="/customers" component={CustomersPage} exact />
        <ProtectedRoute path="/visits" component={VisitsPage} exact />
        <ProtectedRoute path="/activities" component={ActivitiesPage} exact />
        <ProtectedRoute path="/tasks" component={TasksPage} exact />
        <ProtectedRoute path="/calendar" component={CalendarPage} exact />
        <ProtectedRoute path="/orders" component={OrdersPage} exact />
        <ProtectedRoute path="/users" component={UsersPage} exact />
        <ProtectedRoute path="/parameters" component={ParametersPage} exact />
        <ProtectedRoute path="/santral" component={BulutfonPage} exact />
        <ProtectedRoute path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </main>
  );
}

export default App;
