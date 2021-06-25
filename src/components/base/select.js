import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import cn from "classnames";
import Tagify from "@yaireo/tagify";

export default function SelectBox({
  label,
  parentClass,
  onChange,
  multi = false,
  selected,
  options = [],
  placeholder = "Seçiniz",
}) {
  const [optionDatas, setOptionDatas] = useState(options);
  const [focus, setFocus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const randomId = "tagfy_" + Math.floor(Math.random() * 99999);
  function tagTemplate(tagData) {
    return ` ${tagData.name} `;
  }
  function suggestionItemTemplate(tagData) {
    return ` ${tagData.avatar ? ` ` : ""}
            ${tagData.name}
            ${tagData.email}
        
    `;
  }
  useEffect(() => {
    if (multi) {
      const input = document.querySelector("#" + randomId);
      const tagify = new Tagify(input, {
        maxTags: 10,
        dropdown: { enabled: 0 },
        whitelist: options,
        callbacks: {
          add: console.log, // callback when adding a tag
          remove: console.log, // callback when removing a tag
        },
      });
    }
  }, [multi]);

  // useEffect(() => {
  //   if (selected && options) {
  //     const tm = options.find((x) => x.value === selected);
  //     setSearchText(tm?.name || "");
  //     onChange(tm?.value || "");
  //   }
  // }, [selected, options]);
  //
  // useEffect(() => {
  //   if (!selected) {
  //     setOptionDatas(options);
  //     setSearchText(options[0]?.name || "");
  //     onChange(options[0]);
  //   }
  // }, [options]);

  useEffect(() => {
    setOptionDatas(options);
    if (!selected) {
      onChange(options[0]);
    }
    if (selected && options) {
      const tm = options.find((x) => {
        if (x.value === selected) {
          return x;
        }
      });
      onChange(tm);
      setSearchText(tm?.name || "");
    }
  }, [selected, options]);

  const fuzzySearch = (val) => {
    val = val.toLocaleLowerCase();
    const op = {
      threshold: 0.3,
      keys: ["name", "value"],
    };
    const fuse = new Fuse(options, op);
    const result = fuse.search(val).map((x) => x.item);
    setOptionDatas(result);
  };

  const searchOption = (value) => {
    setSearchText(value);
    value = value.trim();
    if (value.length > 0) {
      fuzzySearch(value);
    } else {
      setOptionDatas(options);
    }
  };

  return (
    <div className={cn(["form-group", parentClass])}>
      <label>{label}</label>
      {multi ? (
        <input
          type="text"
          className="form-control selectMode tagify"
          id={randomId}
          onChange={(e) => console.log(e.target.value)}
        />
      ) : (
        <div className=" search-box ">
          <label>
            <div className="search-input">
              <input
                type="text"
                value={searchText}
                placeholder={placeholder}
                className="form-control"
                onChange={(e) => searchOption(e.target.value)}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => setTimeout(() => setFocus(false), 100)}
              />
              <span>
                <i className="fas fa-angle-down" />
              </span>
            </div>
            {/*{multi ? (*/}
            {/*  <div className="multi-area">*/}
            {/*    <div className="tagify  w-100 border rounded h-100   multi">*/}
            {/*      <tag*/}
            {/*        title="html"*/}
            {/*        contenteditable="false"*/}
            {/*        spellcheck="false"*/}
            {/*        tabindex="-1"*/}
            {/*        className="tagify__tag tagify--noAnim"*/}
            {/*        role="tag"*/}
            {/*        __isvalid="true"*/}
            {/*        value="html"*/}
            {/*      >*/}
            {/*        <div>*/}
            {/*          <span className="tagify__tag-text">html</span>*/}
            {/*        </div>*/}
            {/*        <x*/}
            {/*          title=""*/}
            {/*          className="tagify__tag__removeBtn"*/}
            {/*          role="button"*/}
            {/*          aria-label="remove tag"*/}
            {/*        />*/}
            {/*      </tag>*/}
            {/*    </div>*/}
            {/*    <span>*/}
            {/*      <i className="fas fa-angle-down" />*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*) : (*/}
            {/*  */}
            {/*)}*/}
          </label>
          <ul className={cn(["list-area", focus === true ? "show" : "hide"])}>
            {optionDatas.slice(0, 7).map((x) => (
              <li
                onClick={() => {
                  setSearchText(x.name);
                  setFocus(false);
                  onChange(x);
                }}
                key={x.value}
              >
                {x.name}
              </li>
            ))}
            {optionDatas.length > 7 && (
              <li className="font-weight-bold">
                + {optionDatas.length - 7} öğe
              </li>
            )}
          </ul>
        </div>
      )}

      {/*<SelectSearch*/}
      {/*  options={options}*/}
      {/*  multiple={multi}*/}
      {/*  onChange={onChange}*/}
      {/*  value={selected}*/}
      {/*  placeholder={placeholder}*/}
      {/*  search*/}
      {/*  filterOptions={(options) => {*/}
      {/*    const filter = fuzzySearch(options);*/}
      {/*    return (q) => filter(q).slice(0, 8);*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<Select*/}
      {/*  placeholder={placeholder}*/}
      {/*  styles={customStyles}*/}
      {/*  components={animatedComponents}*/}
      {/*  required={required}*/}
      {/*  childClass={childClass}*/}
      {/*  onChange={onChange}*/}
      {/*  options={options}*/}
      {/*  value={selected && options.find((x) => x.value === selected)}*/}
      {/*  isMulti={multi}*/}
      {/*/>*/}
    </div>
  );
}
