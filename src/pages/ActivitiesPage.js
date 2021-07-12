import React, { useState } from "react";
import { Layout, CardHeader, Tabs } from "../components/partials";
import { Button, LiteTable, SelectBox, Input } from "../components/base";
import Modal from "react-bootstrap/Modal";

export default function ActivitiesPage() {
  const [visitAddModalShow, setVisitAddModalShow] = useState(false);
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
          <div className="row">
            <SelectBox
              parentClass="col-md-6"
              label="Aktivite Tipi"
              selected={""}
              options={[
                { value: "", name: "Seçiniz" },
                { value: 1, name: "Ziyaret" },
                { value: 2, name: "Toplantı" },
                { value: 3, name: "Görev" },
              ]}
              onChange={(e) => console.log(e)}
            />

            <SelectBox
              parentClass="col-md-6"
              label="Kullanıcı"
              selected={""}
              options={[
                { value: "", name: "Seçiniz" },
                { value: 1, name: " Kull 1 " },
                { value: 2, name: " Kull 2 " },
                { value: 3, name: " Kull 3 " },
              ]}
              onChange={(e) => console.log(e)}
            />
          </div>

          <div className="row">
            <SelectBox
              parentClass="col-md-6"
              label="Müşteri"
              selected={""}
              options={[
                { value: "", name: "Seçiniz" },
                { value: 1, name: " Müş 1 " },
                { value: 2, name: " Müş 2 " },
                { value: 3, name: " Müş 3 " },
              ]}
              onChange={(e) => console.log(e)}
            />

            <SelectBox
              parentClass="col-md-6"
              label="Müşteri Kişiler"
              selected={""}
              options={[
                { value: "", name: "Seçiniz" },
                { value: 1, name: " Kişi 1 " },
                { value: 2, name: " Kişi 2 " },
                { value: 3, name: " Kişi 3 " },
              ]}
              onChange={(e) => console.log(e)}
            />
          </div>

          <div className="row">
            <Input
              parentClass="col-md-6"
              type="datetime-local"
              label="Planlanan Başlangıç Tarihi:"
              onChange={(e) => console.log(e.target.value)}
            />

            <Input
              parentClass="col-md-6"
              type="datetime-local"
              label="Planlanan Bitiş Tarihi:"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>

          <div className="row">
            <Input
              parentClass="col-md-12"
              label="Konu"
              placeholder="Konu"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>

          <div className="row">
            <Input
              parentClass="col-md-12"
              label="Açıklama"
              placeholder="Açıklama"
              type="textarea"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">Footer</Modal.Footer>
      </Modal>
    </Layout>
  );
}
