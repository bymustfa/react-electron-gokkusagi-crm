import React from "react";
import cn from "classnames";
import auth from "../../app/auth";
import { Button } from "../base";
import { Route, Redirect } from "react-router-dom";
export default function SideUserPanel({ panelToggle, setPanelToggle }) {
  return (
    <>
      <div
        id="kt_quick_user"
        className={cn([
          "offcanvas offcanvas-right p-10",
          panelToggle && "offcanvas-on",
        ])}
      >
        <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
          <h3 className="font-weight-bold m-0">
            Kullanıcı Profili
            <small className="text-muted font-size-sm ml-2">12 görev</small>
          </h3>
          <span
            className="btn btn-xs btn-icon btn-light btn-hover-primary"
            onClick={() => setPanelToggle(false)}
          >
            <i className="ki ki-close icon-xs text-muted" />
          </span>
        </div>

        <div
          className="offcanvas-content pr-5 mr-n5 scroll ps ps--active-y"
          style={{ height: "654px", overflow: "hidden" }}
        >
          <div className="d-flex align-items-center mt-5">
            <div className="symbol symbol-100 mr-5">
              <div
                className="symbol-label"
                style={{
                  backgroundImage: "url('assets/media/users/300_21.jpg')",
                }}
              >
                <i className="fas fa-user fa-3x" />
              </div>
            </div>
            <div className="d-flex flex-column">
              <a
                href="#"
                className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
              >
                Kullanıcı Ad Soyad
              </a>
              <div className="text-muted mt-1">Kullanıcı Tipi Burada</div>
              <div className="navi mt-2">
                <Button
                  text="Çıkış Yap"
                  className=" btn-sm btn-light-primary font-weight-bolder py-2 px-5"
                  onClick={() => {
                    auth.logout(() => {
                      sessionStorage.removeItem("auth");
                      window.location.reload();
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="separator separator-dashed mt-8 mb-5" />

          <div className="navi navi-spacer-x-0 p-0">
            {[1, 2, 3, 4, 5, 6].map((data) => (
              <span className="navi-item" key={data}>
                <div className="navi-link">
                  <div className="symbol symbol-40 bg-light mr-3">
                    <div className="symbol-label">
                      <span className="svg-icon svg-icon-md svg-icon-success">
                        <i className="fab la-diaspora text-danger" />
                      </span>
                    </div>
                  </div>
                  <div className="navi-text">
                    <div className="font-weight-bold">Görev Türü</div>
                    <div className="text-muted">
                      Görev açıklaması
                      {/*<span className="label label-light-danger label-inline font-weight-bold">*/}
                      {/*  update*/}
                      {/*</span>*/}
                    </div>
                  </div>
                </div>
              </span>
            ))}
          </div>

          <div className="separator separator-dashed my-7" />

          <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
            <div className="ps__thumb-x" style={{ left: 0, width: 0 }} />
          </div>
          <div
            className="ps__rail-y"
            style={{ top: 0, height: "654px", right: 0 }}
          >
            <div className="ps__thumb-y" style={{ top: 0, height: "300px" }} />
          </div>
        </div>
      </div>
      {panelToggle && (
        <div
          className="offcanvas-overlay"
          onClick={() => setPanelToggle(false)}
        />
      )}
    </>
  );
}
