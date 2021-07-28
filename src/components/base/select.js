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
  const [multiValues, setMultiValues] = useState("");
  const [focus, setFocus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [tagify, setTagify] = useState(null);

  const randomId = "tagfy_" + Math.floor(Math.random() * 99999);

  useEffect(() => {
    if (multi) {
      setMultiValues(selected == "" ? [] : selected);
      const input = document.querySelector("#" + randomId);

      let tag = new Tagify(input, {
        tagTextProp: "name",
        enforceWhitelist: true,
        maxTags: 10,
        dropdown: { enabled: 0, searchKeys: ["name"] },
        whitelist: options,
        templates: {
          tag: (tagData) => {
            return `<tag 
            title='${tagData.name}'
             contenteditable='false' 
             spellcheck="false" 
             class='tagify__tag ${tagData.class ? tagData.class : ""}' >
                        <x title='remove tag' class='tagify__tag__removeBtn'></x>
                        <div>  <span class='tagify__tag-text'>
                            ${tagData.name}
                         </span> </div>
                    </tag>`;
          },
          dropdownItem: (tagData) => {
            return `  <div
                  name="${tagData.name}"
                  value="${tagData.value}"
                  class="tagify__dropdown__item"
                  tabindex="0"
                  role="option"
                  tagifysuggestionidx="0"
                >  ${tagData.name}  </div>`;
          },
        },
      });
      setTagify(tag);
    }
  }, [multi]);

  useEffect(() => {
    if (multi && tagify) {
      tagify.removeAllTags();
      tagify.settings.whitelist = options;
    }
  }, [options]);

  useEffect(() => {
    if (multi) {
      setMultiValues(selected == "" ? [] : selected);
    } else {
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
          className="tagify form-control selectMode "
          id={randomId}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          defaultValue={multiValues}
        />
      ) : (
        <div className=" search-box position-relative">
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
          </label>
          {focus && (
            <div>
              <div
                className="tagify__dropdown"
                role="listbox"
                aria-labelledby="dropdown"
                placement="bottom"
                position="all"
                style={{ width: "100%" }}
              >
                <div className="tagify__dropdown__wrapper">
                  {optionDatas.length > 0 ? (
                    optionDatas.slice(0, 7).map((x) => (
                      <div
                        name={x.name}
                        value="2"
                        className={cn([
                          "tagify__dropdown__item text-hover-primary bg-hover-light",
                          selected &&
                            selected === x.value &&
                            "text-primary bg-light",
                        ])}
                        role="option"
                        tagifysuggestionidx="0"
                        key={x.value}
                        onClick={() => {
                          setSearchText(x.name);
                          setFocus(false);
                          onChange(x);
                        }}
                      >
                        {x.name}
                      </div>
                    ))
                  ) : (
                    <div
                      name="Öğe Yok"
                      className="tagify__dropdown__item text-center font-weight-bold "
                      role="option"
                      tagifysuggestionidx="0"
                    >
                      <i className="fas fa-times" /> Öğe Yok
                    </div>
                  )}
                  {optionDatas.length > 7 && (
                    <div
                      name={"+" + optionDatas.length - 7 + "öğe"}
                      value="2"
                      className="tagify__dropdown__item "
                      role="option"
                      tagifysuggestionidx="0"
                    >
                      + {optionDatas.length - 7} öğe
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/*<ul className={cn(["list-area", focus === true ? "show" : "hide"])}>*/}
          {/*  {optionDatas.slice(0, 7).map((x) => (*/}
          {/*    <li*/}
          {/*      onClick={() => {*/}
          {/*        setSearchText(x.name);*/}
          {/*        setFocus(false);*/}
          {/*        onChange(x);*/}
          {/*      }}*/}
          {/*      key={x.value}*/}
          {/*    >*/}
          {/*      {x.name}*/}
          {/*    </li>*/}
          {/*  ))}*/}
          {/*  {optionDatas.length > 7 && (*/}
          {/*    <li className="font-weight-bold">*/}
          {/*      + {optionDatas.length - 7} öğe*/}
          {/*    </li>*/}
          {/*  )}*/}
          {/*</ul>*/}
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
