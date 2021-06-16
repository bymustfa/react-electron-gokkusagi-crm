import React from "react";
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
}) {
  return (
    <div className={cn(["form-group", parentClass])}>
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          disabled={disabled}
          className={cn(["form-control", childClass])}
          rows={4}
          defaultValue={value}
        />
      ) : (
        <input
          type={type}
          className={cn(["form-control", childClass])}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          disabled={disabled}
          defaultValue={value}
        />
      )}
    </div>
  );
}
