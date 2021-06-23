import React, { useState } from "react";
import { Button } from "../base";
import { Menu, MenuMobile, SideUserPanel, TopBar } from "./index";

export default function Header() {
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <>
      <MenuMobile toggleProp={menuToggle} menuToggle={setMenuToggle} />
      <Menu toggleProp={menuToggle} menuToggle={setMenuToggle} />
      <div
        className="d-flex flex-column flex-row-fluid wrapper"
        id="kt_wrapper"
      ></div>
      <TopBar setMenuToggle={setMenuToggle} menuToggle={menuToggle} />
    </>
  );
}
