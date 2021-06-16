import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";

import { Layout, CardHeader, Tabs } from "../components/partials";
import { Button, LiteTable } from "../components/base";

import { CustomersTabs, CustomersContents } from "../utils/customerPageUtils";

export default function CustomersPage() {
  const [customerModalShow, setCustomerModalShow] = useState(false);
  const customersContents = CustomersContents();

  return (
    <Layout>
      <CardHeader
        title="Müşteriler"
        description="CRM"
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
            onClick={() => setCustomerModalShow(true)}
          />,
        ]}
      />

      <div className="border rounded p-4">
        <LiteTable />
      </div>

      <Modal size="xl" show={customerModalShow} centered>
        <Tabs
          tabs={CustomersTabs}
          contents={customersContents}
          modal={true}
          modalClose={{ set: setCustomerModalShow, question: true }}
          buttons={[
            <Button
              text="Kaydet"
              icon={<i className="far fa-save" />}
              className="btn-sm"
              key={1}
            />,
          ]}
        />
      </Modal>
    </Layout>
  );
}
