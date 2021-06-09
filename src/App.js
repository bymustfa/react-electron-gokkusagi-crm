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
} from "./pages";

// import HomePage from "./pages/HomePage";
// import CustomersPage from "./pages/CustomersPage";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/customers" component={CustomersPage} exact />
        <Route path="/visits" component={VisitsPage} exact />
        <Route path="/activities" component={ActivitiesPage} exact />
        <Route path="/tasks" component={TasksPage} exact />
        <Route path="/calendar" component={CalendarPage} exact />
        <Route path="/orders" component={OrdersPage} exact />
        <Route path="/users" component={UsersPage} exact />
        <Route path="/parameters" component={ParametersPage} exact />
        <Route path="/bulutfon" component={BulutfonPage} exact />
      </Switch>
    </main>
  );
}

export default App;
