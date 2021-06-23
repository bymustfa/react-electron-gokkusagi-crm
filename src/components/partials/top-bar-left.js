import React from "react";
import { Button } from "../base";

export default function TopBarLeft({ setMenuToggle, menuToggle }) {
  return (
    <>
      <div className="d-none d-lg-flex align-items-center mr-3">
        <Button
          type="base"
          text={<span />}
          className="aside-toggle rounded-0 ml-n3 mr-10 burger-icon burger-icon-right"
          onClick={() => setMenuToggle(!menuToggle)}
        />

        <img
          alt="Logo"
          src="https://litesoft.com.tr/assets/img/litesoft-logo.png"
          className="logo-sticky max-h-35px"
        />
      </div>
    </>
  );
}
