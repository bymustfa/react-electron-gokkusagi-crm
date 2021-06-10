import React, { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import axios from "axios";
import cn from "classnames";

import { Layout, CardHeader, Tabs } from "../components/partials";
import { Button, Input, SelectBox, LiteTable } from "../components/base";

export default function CustomersPage() {
  const [customerDatas, setCustomerDatas] = useState({
    Unvan: "",
    Vkn: "",
    SatisTemsilcisiId: "",
    MusteriGrubu: "",
    MusteriTipi: "",
    MusteriNo: "",
    ZiyaretSikligi: "",
    VergiDaire: "",
    Mail: "",
    Telefon: "",
    Faks: "",
    Adres: "",
    Aciklama: "",
    Adresler: [],
    Kisiler: [],
  });
  const [customers, setCustomers] = useState([]);
  const [customerModalShow, setCustomerModalShow] = useState(false);

  const newCustomerTabs = [
    {
      id: 1,
      active: true,
      icon: <i className="fas fa-home" />,
      title: "Genel Bilgiler",
    },
    {
      id: 2,
      active: false,
      icon: <i className="fas fa-map-marker-alt" />,
      title: "Adresler",
    },
    {
      id: 3,
      active: false,
      icon: <i className="fas fa-users" />,
      title: "Yetkililer",
    },
  ];

  const [demo, setDemo] = useState("");

  const newCustomersContents = [
    {
      id: 1,
      active: true,
      content: (
        <>
          <div className="row">
            <Input
              parentClass="col-md-3"
              type="text"
              placeholder="Ünvan"
              label="Ünvan"
              onChange={(e) => {
                console.log(e.target.value);
                const dt = customerDatas;
                dt.Unvan = e.target.value;
                console.log("dt: ", dt);
                setCustomerDatas(dt);
                console.log("customerDatas: ", customerDatas);
              }}
              required
            />

            <Input
              parentClass="col-md-3"
              type="text"
              placeholder="Vkn"
              label="Vkn"
              onChange={(e) => console.log(e.target.value)}
              required
            />
            <SelectBox
              parentClass="col-md-3"
              label="Satış Temsilcisi"
              onChange={(e) => console.log(e)}
              required
              selected={false}
              options={[
                { value: "", label: "Seçiniz" },
                { value: 1, label: "daneme" },
                { value: 2, label: "daneme2" },
              ]}
            />

            <SelectBox
              parentClass="col-md-3"
              label="Müşteri Grubu"
              onChange={(e) => console.log(e)}
              required
              selected={false}
              options={[
                { value: "", label: "Seçiniz" },
                { value: 1, label: "daneme" },
                { value: 2, label: "daneme2" },
              ]}
            />
          </div>
          <div className="row">
            <SelectBox
              parentClass="col-md-3"
              label="Müşteri Tipi"
              onChange={(e) => console.log(e)}
              required
              selected={false}
              options={[
                { value: "", label: "Seçiniz" },
                { value: 1, label: "daneme" },
                { value: 2, label: "daneme2" },
              ]}
            />

            <Input
              parentClass="col-md-3"
              type="text"
              placeholder="Müşteri No"
              label="Müşteri No"
              onChange={(e) => console.log(e.target.value)}
              required
            />

            <SelectBox
              parentClass="col-md-3"
              label="Ziyaret Sıklığı"
              onChange={(e) => console.log(e)}
              required
              selected={false}
              options={[
                { value: "", label: "Seçiniz" },
                { value: 1, label: "daneme" },
                { value: 2, label: "daneme2" },
              ]}
            />

            <SelectBox
              parentClass="col-md-3"
              label="Vergi Dairesi"
              onChange={(e) => console.log(e)}
              required
              selected={false}
              options={[
                { value: "", label: "Seçiniz" },
                { value: 1, label: "daneme" },
                { value: 2, label: "daneme2" },
              ]}
            />
          </div>
          <div className="row">
            <Input
              parentClass="col-md-4"
              type="text"
              placeholder="Mail"
              label="Mail"
              onChange={(e) => console.log(e.target.value)}
              required
            />
            <Input
              parentClass="col-md-4"
              type="text"
              placeholder="Telefon"
              label="Telefon"
              onChange={(e) => console.log(e.target.value)}
              required
            />
            <Input
              parentClass="col-md-4"
              type="text"
              placeholder="Faks"
              label="Faks"
              onChange={(e) => console.log(e.target.value)}
              required
            />
          </div>
          <div className="row">
            <Input
              parentClass="col-md-6"
              type="textarea"
              placeholder="Adres"
              label="Adres"
              onChange={(e) => console.log(e.target.value)}
              required
            />
            <Input
              parentClass="col-md-6"
              type="textarea"
              placeholder="Açıklama"
              label="Açıklama"
              onChange={(e) => console.log(e.target.value)}
              required
            />
          </div>
        </>
      ),
    },
    {
      id: 2,
      active: false,
      content: (
        <div>
          <h1> tab 2 </h1>
        </div>
      ),
    },
    {
      id: 3,
      active: false,
      content: (
        <div>
          <h1> tab 3</h1>
        </div>
      ),
    },
  ];

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
        <LiteTable dumyData={customers} />
      </div>

      <Modal size="xl" show={customerModalShow} centered>
        <Tabs
          tabs={newCustomerTabs}
          contents={newCustomersContents}
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
