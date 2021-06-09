import React from "react";
import { Link } from "react-router-dom";
import { Layout, CardHeader } from "../components/partials";

//import "../styles/plugins/fullcalendar.bundle.css";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// <FullCalendar
//     plugins={[dayGridPlugin]}
//     initialView="dayGridMonth"
//     locale="tr"
//     eventClick={(arg) => console.log(arg)}
//     events={[
//         { title: "event 1", date: "2021-06-13", id: 1 },
//         { title: "event 2", date: "2021-06-15", id: 2 },
//         { title: "event 2", date: "2021-06-15", id: 3 },
//     ]}
// />

export default function HomePage(props) {
  return (
    <Layout>
      <CardHeader title="Anasayfa" />
      <Link to="login">Login</Link>
    </Layout>
  );
}
