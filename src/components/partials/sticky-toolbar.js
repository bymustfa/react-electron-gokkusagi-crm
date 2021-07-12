import React, { useState } from "react";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { SpeedCustomerForm } from "./index";

export default function StickyToolbar() {
  const [customerSpeedModalOpen, setSustomerSpeedModalOpen] = useState(false);
  return (
    <>
      <ul className="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4">
        <li
          className="nav-item mb-2"
          onClick={() => setSustomerSpeedModalOpen(true)}
        >
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip id={`tooltip-1`}>Hızlı Müşteri Ekle</Tooltip>}
          >
            <span className="btn btn-sm btn-icon btn-bg-light btn-icon-primary btn-hover-primary">
              <i className="la la-vcard-o" />
            </span>
          </OverlayTrigger>
        </li>

        <li className="nav-item mb-2">
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip id={`tooltip-2`}>Hızlı Aktivite Girişi</Tooltip>}
          >
            <span className="btn btn-sm btn-icon btn-bg-light btn-icon-success btn-hover-success">
              <i className="flaticon-calendar-with-a-clock-time-tools" />
            </span>
          </OverlayTrigger>
        </li>

        <li className="nav-item mb-2">
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip id={`tooltip-2`}>Hızlı Faaliyet Girişi</Tooltip>}
          >
            <span className="btn btn-sm btn-icon btn-bg-light btn-icon-warning btn-hover-warning">
              <i className="flaticon-event-calendar-symbol" />
            </span>
          </OverlayTrigger>
        </li>
      </ul>

      <Modal size="lg" show={customerSpeedModalOpen} centered>
        <Modal.Header>
          <Modal.Title>Hızlı Müşteri</Modal.Title>
          <button
            type="button"
            className="close ml-4"
            onClick={() => setSustomerSpeedModalOpen(false)}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <SpeedCustomerForm />
        </Modal.Body>
      </Modal>
    </>
  );
}
