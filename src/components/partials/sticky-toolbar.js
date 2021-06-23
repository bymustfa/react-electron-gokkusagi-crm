import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function StickyToolbar() {
  return (
    <>
      <ul className="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4">
        <li className="nav-item mb-2" title="">
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip id={`tooltip-123`}>Hızlı Müşteri Ekle</Tooltip>}
          >
            <span className="btn btn-sm btn-icon btn-bg-light btn-icon-primary btn-hover-primary">
              <i className="la la-vcard-o" />
            </span>
          </OverlayTrigger>
        </li>

        <li className="nav-item mb-2" title="">
          <OverlayTrigger
            placement="left"
            overlay={
              <Tooltip id={`tooltip-123`}>Hızlı Faaliyet Girişi</Tooltip>
            }
          >
            <span className="btn btn-sm btn-icon btn-bg-light btn-icon-warning btn-hover-warning">
              <i className="flaticon-event-calendar-symbol" />
            </span>
          </OverlayTrigger>
        </li>
      </ul>
    </>
  );
}
