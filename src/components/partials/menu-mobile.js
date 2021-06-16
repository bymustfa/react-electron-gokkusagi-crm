import React from "react";
import { Button } from "../base";

export default function MenuMobile({ toggleProp, menuToggle }) {
  return (
    <div id="kt_header_mobile" className="header-mobile header-mobile-fixed">
      <img
        alt="Logo"
        src="https://litesoft.com.tr/assets/img/litesoft-logo.png"
        className="logo-default max-h-30px"
      />

      <div className="d-flex align-items-center">
        <Button
          type="base"
          text={<span />}
          onClick={() => menuToggle(!toggleProp)}
          className="p-0 rounded-0  burger-icon burger-icon-left"
        />

        <button className="btn btn-hover-text-primary p-0 ml-3">
          <span className="svg-icon svg-icon-xl">
            <i className="fas fa-user" />
          </span>
        </button>
      </div>
    </div>
  );
}
