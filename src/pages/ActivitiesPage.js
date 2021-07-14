import React, { useState } from "react";
import { Button, LiteTable, SelectBox, Input } from "../components/base";
import {
  Layout,
  CardHeader,
  Tabs,
  ActiviteNormalForm,
} from "../components/partials";
import Modal from "react-bootstrap/Modal";

export default function ActivitiesPage() {
  const [visitAddModalShow, setVisitAddModalShow] = useState(false);
  const [visitDatas, setVisitDatas] = useState({
    AktiviteTipi: 0,
  });

  return (
    <Layout>
      <CardHeader
        title="Aktiviteler"
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
            onClick={() => setVisitAddModalShow(true)}
            className="btn-sm"
          />,
        ]}
      />

      <div className="border rounded p-4">{/*<LiteTable />*/}</div>

      <Modal size="lg" show={visitAddModalShow} centered>
        <Modal.Header>
          <Modal.Title>Aktivite</Modal.Title>
          <button
            type="button"
            className="close ml-4"
            onClick={() => setVisitAddModalShow(false)}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <ActiviteNormalForm />
        </Modal.Body>
      </Modal>
    </Layout>
  );
}
