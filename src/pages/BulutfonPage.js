import React from "react";

import { Layout, CardHeader } from "../components/partials";
import { Button, LiteTable } from "../components/base";

export default function BulutfonPage() {
  return (
    <Layout>
      <CardHeader
        title="Santral"
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
        ]}
      />

      <div className="border rounded p-4">{/*<LiteTable />*/}</div>
    </Layout>
  );
}
