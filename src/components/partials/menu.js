import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { menus } from "../../utils";

export default function Menu({ toggleProp, menuToggle }) {
  const [toggle, setToggle] = useState(false);
  const [menuDatas, setMenuDatas] = useState([]);
  useEffect(() => {
    setToggle(toggleProp);
  }, [toggleProp]);

  useEffect(() => {
    menuToggle(toggle);
  }, [toggle]);

  useEffect(() => {
    setMenuDatas(menus);
  }, []);

  return (
    toggle && (
      <>
        <div
          className="aside aside-left d-flex flex-column flex-row-auto aside-on"
          id="kt_aside"
        >
          <div
            className="aside-menu-wrapper flex-column-fluid scroll ps ps--active-y"
            id="kt_aside_menu_wrapper"
            style={{ height: "760px", overflow: "hidden" }}
          >
            <div
              id="kt_aside_menu"
              className="aside-menu min-h-lg-800px"
              data-menu-vertical="1"
              data-menu-scroll="1"
              data-menu-dropdown-timeout="500"
            >
              <ul className="menu-nav">
                {menuDatas.map((menu) => (
                  <li
                    className={cn(["menu-item", menu.open && "menu-item-open"])}
                    aria-haspopup="true"
                    key={menu.id}
                  >
                    {menu.href ? (
                      <Link to="/" className="menu-link  menu-toggle">
                        <span className="svg-icon menu-icon">
                          {menu.icon && menu.icon}
                        </span>
                        <span className="menu-text">{menu.title}</span>
                        {menu.child && <i className="menu-arrow" />}
                      </Link>
                    ) : (
                      <span
                        className="menu-link  menu-toggle"
                        onClick={() => {
                          let mm = menus.map((x) => {
                            if (x.id === menu.id) {
                              x.open = x.open ? false : true;
                            } else {
                              x.open = false;
                            }
                            return x;
                          });
                          setMenuDatas(mm);
                        }}
                      >
                        <span className="svg-icon menu-icon">
                          {menu.icon && menu.icon}
                        </span>
                        <span className="menu-text">{menu.title}</span>
                        {menu.child && <i className="menu-arrow" />}
                      </span>
                    )}

                    {menu.child && (
                      <>
                        <i className="menu-arrow" />
                        <div className="menu-submenu  ">
                          <ul
                            className="menu-subnav "
                            style={
                              menu.open
                                ? {
                                    display: "block",
                                  }
                                : {
                                    display: "none",
                                    overflow: "hidden",
                                  }
                            }
                          >
                            {menu.child.map((child) => (
                              <li
                                className="menu-item menu-item-submenu"
                                key={child.id}
                              >
                                <Link
                                  to={child.href}
                                  className="menu-link menu-toggle"
                                >
                                  <i className="menu-bullet menu-bullet-dot" />
                                  <span className="menu-text">
                                    {child.title}
                                  </span>
                                  <i className="menu-arrow" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
              <div
                className="ps__thumb-x"
                style={{ left: "0px", width: "0px" }}
              ></div>
            </div>
            <div
              className="ps__rail-y"
              style={{ top: "0px", height: "760px", right: "0px" }}
            >
              <div
                className="ps__thumb-y"
                style={{ top: "0px", height: "300px" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="aside-overlay" onClick={() => setToggle(!toggle)} />
      </>
    )
  );
}
