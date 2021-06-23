import React, { useState } from "react";
import { Button } from "../base";
import { SideUserPanel } from "./index";

export default function TopBarRight() {
  const [panelToggle, setPanelToggle] = useState(false);
  return (
    <>
      <div className="topbar">
        <div className="topbar-item mr-4">
          <Button
            type="light"
            className="btn-clean btn-text-dark-75"
            icon={<i className="fas fa-user" />}
            text={<span className="font-weight-bold">2</span>}
            onClick={() => setPanelToggle(true)}
          />
        </div>
      </div>

      <SideUserPanel
        panelToggle={panelToggle}
        setPanelToggle={setPanelToggle}
      />
    </>
  );
}
