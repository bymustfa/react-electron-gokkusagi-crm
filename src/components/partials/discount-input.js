import React, { useState, useEffect } from "react";
import cn from "classnames";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function DiscountInput({
  currency = "TL",
  onChange,
  deleteDiscount,
  datas,
}) {
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(datas.Tip);
  const [discountValue, setDiscountValue] = useState(datas.Iskonto);
  const [inputMax, setInputMax] = useState(9999999);

  const ref = useDetectClickOutside({
    onTriggered: function () {
      setDropDownOpen(false);
    },
  });

  const actionSet = (action) => {
    setActiveAction(action);
    setDropDownOpen(false);

    if (action === "yuzde") {
      setInputMax(100);
    } else {
      setInputMax(9999999);
    }

    onChange({ Tip: action, Iskonto: discountValue, Sira: datas.Sira });
  };

  useEffect(() => {
    onChange({ Tip: activeAction, Iskonto: discountValue, Sira: datas.Sira });
  }, [discountValue]);

  return (
    <>
      <div className="row mb-3">
        <div className="input-group">
          <div className="input-group-prepend">
            <button
              type="button"
              className={cn([
                "btn btn-secondary ",
                datas.Sira === 1 ? "disabled" : "text-hover-primary ",
              ])}
              onClick={() => {
                datas.Sira !== 1 && deleteDiscount(datas.Sira);
              }}
            >
              <i className="fas fa-trash-alt fa-sm" />
            </button>
          </div>

          <input
            type="number"
            step={0.01}
            min={0}
            max={inputMax}
            className="form-control"
            value={discountValue}
            onChange={(e) => setDiscountValue(parseFloat(e.target.value))}
          />
          <div className="input-group-append" ref={ref}>
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              onClick={() => setDropDownOpen(true)}
            >
              {activeAction === "doviz" ? currency : "%"}
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
                onClick={() => actionSet("doviz")}
              >
                {currency}
              </span>
              <span
                className="dropdown-item cursor-pointer"
                onClick={() => actionSet("yuzde")}
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
