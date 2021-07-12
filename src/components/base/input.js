import React, { useEffect, useState } from "react";
import cn from "classnames";

export default function Input({
  label,
  placeholder,
  type = "text",
  parentClass,
  childClass,
  onChange,
  required = false,
  disabled = false,
  value = "",
  rows = 4,
  min = 0,
  max = null,
  step = null,
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => setInputValue(value), [value]);

  if (type === "textarea") {
    return (
      <div className={cn(["form-group", parentClass])}>
        <label>{label}</label>
        <textarea
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          disabled={disabled}
          className={cn(["form-control", childClass])}
          rows={rows}
          value={inputValue}
        />
      </div>
    );
  } else if (type === "text") {
    return (
      <div className={cn(["form-group", parentClass])}>
        <label>{label}</label>
        <input
          type={type}
          className={cn(["form-control", childClass])}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          disabled={disabled}
          value={inputValue}
        />
      </div>
    );
  } else if (type === "number") {
    return (
      <div className={cn(["form-group", parentClass])}>
        <label>{label}</label>
        <input
          type={type}
          className={cn(["form-control", childClass])}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          disabled={disabled}
          value={inputValue}
          min={min}
          max={max}
          step={step}
        />
      </div>
    );
  } else {
    return (
      <div className={cn(["form-group", parentClass])}>
        <label>{label}</label>
        <input
          type={type}
          className={cn(["form-control", childClass])}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          disabled={disabled}
          value={inputValue}
        />
      </div>
    );
  }
}
