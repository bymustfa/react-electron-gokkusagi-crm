import React, { useState } from "react";
import { Layout, CardHeader } from "../components/partials";
import { Button } from "../components/base";

export default function CalendarPage() {
  return (
    <Layout>
      <CardHeader
        title="Takvim"
        description="CRM"
        buttons={[
          <Button
            key={1}
            text="Yenile"
            icon={<i className="fas fa-sync" />}
            type="info"
            className="mr-3"
          />,
          <Button
            key={2}
            text="Filtre"
            type="success"
            className="mr-3"
            icon={<i className="fas fa-filter" />}
          />,
          <Button
            key={3}
            text="Yeni Ekle"
            icon={<i className="fas fa-plus" />}
          />,
        ]}
      />

      <div className="border rounded p-4">
        <h1>Takvim Gelicek</h1>
      </div>
    </Layout>
  );
}
