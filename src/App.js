import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles/style.scss";

import { ProtectedRoute } from "./app/protected.route";

import {
  HomePage,
  CustomersPage,
  ActivitiesPage,
  ActionsPage,
  TasksPage,
  CalendarPage,
  OrdersPage,
  OffersPage,
  UsersPage,
  ParametersPage,
  BulutfonPage,
  LoginPage,
  Error404,
} from "./pages";

function App() {
  return (
    <main style={{ minHeight: "100%" }}>
      <Switch>
        <Route path="/login" component={LoginPage} exact />

        <ProtectedRoute path="/" component={HomePage} exact />
        <ProtectedRoute path="/customers" component={CustomersPage} exact />
        <ProtectedRoute path="/activities" component={ActivitiesPage} exact />
        <ProtectedRoute path="/actions" component={ActionsPage} exact />
        <ProtectedRoute path="/tasks" component={TasksPage} exact />
        <ProtectedRoute path="/calendar" component={CalendarPage} exact />
        <ProtectedRoute path="/offers" component={OffersPage} exact />

        <ProtectedRoute path="/users" component={UsersPage} exact />
        <ProtectedRoute path="/parameters" component={ParametersPage} exact />
        <ProtectedRoute path="/santral" component={BulutfonPage} exact />
        <ProtectedRoute path="*" component={Error404} />
      </Switch>
    </main>
  );
}

export default App;
