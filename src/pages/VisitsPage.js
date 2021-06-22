import React, { useState } from "react";
import { Layout, CardHeader, Tabs } from "../components/partials";
import { Button, LiteTable, SelectBox, Input } from "../components/base";
import Modal from "react-bootstrap/Modal";

export default function VisitsPage() {
  const [visitAddModalShow, setVisitAddModalShow] = useState(false);
  return (
    <Layout>
      <CardHeader
        title="Ziyaretler"
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
            onClick={() => setVisitAddModalShow(true)}
          />,
        ]}
      />

      <div className="border rounded p-4">
        <LiteTable />
      </div>
      {/*TODO: burası yarım kaldı*/}
      <Modal size="lg" show={visitAddModalShow} centered>
        <Modal.Header>
          <Modal.Title>Ziyaret</Modal.Title>
          <button
            type="button"
            className="close ml-4"
            onClick={() => setVisitAddModalShow(false)}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <SelectBox
              label="Müşteri"
              placeholder="Seçiniz"
              parentClass="col-md-6"
              selected={""}
              options={[
                { value: "", name: "Seçiniz" },
                { value: 1, name: "Müş 1" },
              ]}
              onChange={(e) => console.log(e)}
            />

            <SelectBox
              label="Adres"
              placeholder="Seçiniz"
              parentClass="col-md-6"
              selected={""}
              options={[
                { value: "", name: "Seçiniz" },
                { value: 1, name: "Ad 1" },
              ]}
              onChange={(e) => console.log(e)}
            />
          </div>

          <div className="row">
            <SelectBox
              label="Müşteri Kişiler"
              placeholder="Seçiniz"
              parentClass="col-md-6"
              selected={""}
              options={[
                { value: "", name: "Seçiniz" },
                { value: 1, name: "Kişi 1" },
              ]}
              onChange={(e) => console.log(e)}
            />

            <SelectBox
              label="Satıcılar"
              placeholder="Seçiniz"
              parentClass="col-md-6"
              selected={""}
              options={[
                { value: "", name: "Seçiniz" },
                { value: 1, name: "Satıcı 1" },
              ]}
              onChange={(e) => console.log(e)}
            />
          </div>

          <div className="row">
            <Input
              type="datetime-local"
              parentClass="col-md-6"
              label="Planlanan Başlangıç Tarihi"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">Footer</Modal.Footer>
      </Modal>
    </Layout>
  );
}
