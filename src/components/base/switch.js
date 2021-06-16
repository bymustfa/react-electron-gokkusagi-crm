import React from "react";
import cn from "classnames";

export default function Switch({
  onChange,
  parentClass,
  label,
  checked = false,
}) {
  return (
    <>
      <div className={cn(["form-group", parentClass])}>
        <label>{label}</label>
        <div className="col-12 bg-white border rounded p-1 d-flex align-content-center justify-content-center">
          <span className="switch switch-outline switch-icon switch-success  text-center">
            <label>
              <input
                onChange={onChange}
                type="checkbox"
                defaultChecked={checked}
                name="select"
              />
              <span />
            </label>
          </span>
        </div>
      </div>
    </>
  );
}
