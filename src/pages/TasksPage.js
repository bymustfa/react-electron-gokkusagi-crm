import React, { useState } from "react";
import {
  Layout,
  CardHeader,
  TaskNormalForm,
  ActiviteNormalForm,
} from "../components/partials";
import { Button, LiteTable } from "../components/base";
import Modal from "react-bootstrap/Modal";

export default function TasksPage() {
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const handleTaskSave = (saveDatas) => {
    console.log(saveDatas);
  };

  return (
    <Layout>
      <CardHeader
        title="Görevler"
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
            onClick={() => setTaskModalOpen(true)}
          />,
        ]}
      />

      <div className="border rounded p-4">{/*<LiteTable />*/}</div>

      <Modal size="lg" show={taskModalOpen} centered>
        <Modal.Header>
          <Modal.Title>Görev</Modal.Title>
          <button
            type="button"
            className="close ml-4"
            onClick={() => setTaskModalOpen(false)}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <TaskNormalForm handleTaskSave={handleTaskSave} />
        </Modal.Body>
      </Modal>
    </Layout>
  );
}
