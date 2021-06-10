import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import cn from "classnames";

export default function SelectBox({
  label,
  parentClass,
  childClass,
  onChange,
  required = false,
  multi = false,
  selected,
  options = [],
  placeholder = "Seçiniz",
}) {
  const animatedComponents = makeAnimated();

  const customStyles = {};

  return (
    <div className={cn(["form-group", parentClass])}>
      <label>{label}</label>
      <Select
        placeholder={placeholder}
        styles={customStyles}
        components={animatedComponents}
        required={required}
        childClass={childClass}
        onChange={onChange}
        options={options}
        defaultValue={selected && options.find((x) => x.value === selected)}
        isMulti={multi}
      />
    </div>
  );
}
