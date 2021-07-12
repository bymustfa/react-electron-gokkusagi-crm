import React from "react";
import { Layout, CardHeader } from "../components/partials";
import { Button, LiteTable } from "../components/base";

export default function ParametersPage() {
  return (
    <Layout>
      <CardHeader
        title="Parametreler"
        description="Yönetim"
        buttons={[
          <Button
            key={1}
            text="Yenile"
            icon={<i className="fas fa-sync" />}
            type="info"
            className="mr-3 btn-sm"
          />,
          <Button
            key={2}
            text="Filtre"
            type="success"
            className="mr-3 btn-sm"
            icon={<i className="fas fa-filter" />}
          />,
          <Button
            key={3}
            text="Yeni Ekle"
            icon={<i className="fas fa-plus" />}
            className="btn-sm"
          />,
        ]}
      />

      <div className="border rounded p-4">{/*<LiteTable />*/}</div>
    </Layout>
  );
}
