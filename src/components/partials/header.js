import React, { useState } from "react";
import { Button } from "../base";
import { Menu, MenuMobile } from "./index";

export default function Header() {
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <>
      <MenuMobile toggleProp={menuToggle} menuToggle={setMenuToggle} />
      <Menu toggleProp={menuToggle} menuToggle={setMenuToggle} />
      <div
        className="d-flex flex-column flex-row-fluid wrapper"
        id="kt_wrapper"
      >
        <div id="kt_header" className="header header-fixed">
          <div className="container d-flex align-items-stretch justify-content-between">
            <div className="d-none d-lg-flex align-items-center mr-3">
              <Button
                type="base"
                text={<span />}
                className="aside-toggle rounded-0 ml-n3 mr-10 burger-icon burger-icon-right"
                onClick={() => setMenuToggle(!menuToggle)}
              />

              <img
                alt="Logo"
                src="https://litesoft.com.tr/assets/img/litesoft-logo.png"
                className="logo-sticky max-h-35px"
              />
            </div>

            <div className="topbar">
              <div className="dropdown d-flex d-lg-none">
                <div
                  className="topbar-item"
                  data-toggle="dropdown"
                  data-offset="10px,0px"
                >
                  <div className="btn btn-icon btn-clean btn-lg btn-dropdown mr-1">
                    <span className="svg-icon svg-icon-xl">SVG</span>
                  </div>
                </div>

                <div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                  <div
                    className="quick-search quick-search-dropdown"
                    id="kt_quick_search_dropdown"
                  >
                    <form method="get" className="quick-search-form">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <span className="svg-icon svg-icon-lg">SVG</span>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <i className="quick-search-close ki ki-close icon-sm text-muted"></i>
                          </span>
                        </div>
                      </div>
                    </form>

                    <div
                      className="quick-search-wrapper scroll"
                      data-scroll="true"
                      data-height="325"
                      data-mobile-height="200"
                    ></div>
                  </div>
                </div>
              </div>

              <div className="topbar-item mr-4">
                <div
                  className="btn btn-icon btn-sm btn-clean btn-text-dark-75"
                  id="kt_quick_user_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <i className="fas fa-user" />
                  </span>
                </div>
              </div>

              <div className="topbar-item">
                <Button text={3} type="primary" className="btn-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
