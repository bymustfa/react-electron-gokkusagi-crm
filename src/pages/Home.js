import React from "react";
import { Link } from "react-router-dom";
import "../styles/plugins/fullcalendar.bundle.css";

import { Button } from "../components/base";

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

export default function Home(props) {
  console.log("Home Page Load");
  return (
    <div>
      <h1>Anasyafa </h1>
      <Link to="/siparis"> Sipariş Sayfası </Link>
      <Button text="Deneme" onClick={() => alert("Tıklandı")} />
      <Button text="Deneme" type="dark" onClick={() => alert("Tıklandı")} />
    </div>
  );
}
