import React from "react";
import { TopBarRight, TopbarLeft } from "./index";

export default function TopBar({ setMenuToggle, menuToggle }) {
  return (
    <>
      <div className="header header-fixed">
        <div className="container d-flex align-items-stretch justify-content-between">
          <TopbarLeft setMenuToggle={setMenuToggle} menuToggle={menuToggle} />
          <TopBarRight />
        </div>
      </div>
    </>
  );
}
