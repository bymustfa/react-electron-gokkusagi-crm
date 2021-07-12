import React, { useState, useCallback } from "react";

import {
  Layout,
  CardHeader,
  Tabs,
  ActionNormalForm,
} from "../components/partials";
import {
  Button,
  LiteTable,
  SelectBox,
  Input,
  FileUploader,
} from "../components/base";

import Modal from "react-bootstrap/Modal";

import moment from "moment";
import "moment/locale/tr";

export default function ActionsPage() {
  moment.locale("tr");
  const [activiteModalShow, setActiviteModalShow] = useState(false);

  const handleActiviteSave = (saveDatas, fileState) => {
    const formData = new FormData();
    Object.keys(saveDatas).map((item) => {
      formData.append(item, saveDatas[item]);
    });

    fileState.map((file) => {
      formData.append("file", file);
    });
    const controlDatas = [...formData].map((x) => {
      return {
        key: x[0],
        value: x[1],
      };
    });

    console.log(controlDatas, [...formData]);
  };

  return (
    <Layout>
      <CardHeader
        title="Faaliyetler"
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
            className="btn-sm"
            icon={<i className="fas fa-plus" />}
            onClick={() => setActiviteModalShow(true)}
          />,
        ]}
      />

      <div className="border rounded p-4">{/*<LiteTable />*/}</div>

      <Modal size="lg" show={activiteModalShow} centered>
        <Modal.Header>
          <Modal.Title>Faaliyet</Modal.Title>
          <button
            type="button"
            className="close ml-4"
            onClick={() => setActiviteModalShow(false)}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <ActionNormalForm handleActiviteSave={handleActiviteSave} />
        </Modal.Body>
      </Modal>
    </Layout>
  );
}
