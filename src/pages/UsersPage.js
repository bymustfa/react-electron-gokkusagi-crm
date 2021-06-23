import React from "react";
import { Layout, CardHeader } from "../components/partials";
import { Button, LiteTable } from "../components/base";

export default function UsersPage() {
  return (
    <Layout>
      <CardHeader
        title="Kullanıcılar"
        description="Yönetim"
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

      <div className="border rounded p-4">{/*<LiteTable />*/}</div>
    </Layout>
  );
}
