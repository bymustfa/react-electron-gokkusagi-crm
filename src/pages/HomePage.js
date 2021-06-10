import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, CardHeader } from "../components/partials";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import trLocale from "@fullcalendar/core/locales/tr";

export default function HomePage(props) {
  return (
    <Layout>
      <CardHeader title="Anasayfa" />

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        locale={trLocale}
        events={[
          { title: "event 1", date: "2021-06-13", id: 1 },
          {
            title: "event 2",
            date: "2021-06-15",
            id: 2,
            className: "fc-event-danger fc-event-solid-warning",
          },
          {
            title: "event 2",
            date: "2021-06-15",
            id: 2,
            className: "fc-event-danger fc-event-solid-warning",
          },
          {
            title: "event 2",
            date: "2021-06-15",
            id: 2,
            className: "fc-event-danger fc-event-solid-warning",
          },
          { title: "event 2", date: "2021-06-15", id: 2 },
          { title: "event 2", date: "2021-06-15", id: 2 },
          { title: "event 2", date: "2021-06-15", id: 2 },
          {
            title: "event 2",
            date: "2021-06-15",
            id: 3,
            className: "fc-event-danger fc-event-solid-warning",
          },
        ]}
        headerToolbar={{
          start: "title",
          center: "dayGridMonth,timeGridWeek,timeGridDay",
          end: "prev,today,next",
        }}
        buttonText={{
          today: "Bugün",
          month: "Aylık",
          week: "Haftalık",
          day: "Günlük",
          list: "Liste",
        }}
        dayMaxEventRows={true}
        navLinks={true}
        navLinkDayClick={(e) => console.log("arg: ", e)}
        nowIndicator={true}
        eventClick={(arg) => console.log("Event: ", arg)}
        select={(start, end, allDay) => console.log(start, end, allDay)}
      />
    </Layout>
  );
}
