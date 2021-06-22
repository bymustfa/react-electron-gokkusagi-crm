import React, { useState } from "react";
import cn from "classnames";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function TableDropdown({ children }) {
  const [toggle, setToggle] = useState(false);

  const ref = useDetectClickOutside({
    onTriggered: function () {
      setToggle(false);
    },
  });

  return (
    <>
      <div className="position-relative drop-element" ref={ref}>
        <span className="cursor-pointer" onClick={() => setToggle(!toggle)}>
          <i className="fas fa-cog" /> İşlemler
        </span>
        {toggle && (
          <div
            className={cn([
              "dropdown-menu dropdown-menu-sm dropdown-menu-right",
              toggle && "show",
            ])}
          >
            <ul className="navi flex-column navi-hover py-2">
              <li className="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">
                İşlemler:
              </li>
              {children}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
