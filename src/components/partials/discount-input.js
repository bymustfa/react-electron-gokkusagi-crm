import React, { useState, useEffect } from "react";
import cn from "classnames";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function DiscountInput({
  currency = "TL",
  action = "money",
  changeType,
  value = 0,
  order,
}) {
  const [dropdownOpen, setDropDownOpen] = useState(false);

  const [activeAction, setActiveAction] = useState(action);

  const ref = useDetectClickOutside({
    onTriggered: function () {
      setDropDownOpen(false);
    },
  });

  const actionSet = (value) => {
    setActiveAction("money");
    setDropDownOpen(false);
    changeType(value, order);
  };

  return (
    <>
      <div className="row mb-3">
        <div className="input-group">
          <input
            type="number"
            step={0.01}
            min={0}
            className="form-control"
            value={value}
          />
          <div className="input-group-append" ref={ref}>
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              onClick={() => setDropDownOpen(true)}
            >
              {activeAction === "money" ? currency : "%"}
            </button>
            <div
              className={cn(["dropdown-menu", dropdownOpen && "show"])}
              style={{
                top: 45,
                left: "calc(100% - 130px)",
                willChange: "transform",
              }}
            >
              <span
                className="dropdown-item cursor-pointer"
                onClick={() => actionSet("money")}
              >
                {currency}
              </span>
              <span
                className="dropdown-item cursor-pointer"
                onClick={() => actionSet("percent")}
              >
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
