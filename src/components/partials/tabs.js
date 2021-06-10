import React, { useState } from "react";
import cn from "classnames";
import swal from "sweetalert";

export default function Tabs({
  tabs,
  contents,
  buttons,
  modal = false,
  modalClose,
}) {
  const [tabState, setTabState] = useState(tabs);
  const [contentState, setContentState] = useState(contents);

  const setActiveTab = (id) => {
    let tab = tabState.map((x) => {
      if (x.id === id) {
        x.active = true;
      } else {
        x.active = false;
      }
      return x;
    });
    let con = contentState.map((x) => {
      if (x.id === id) {
        x.active = true;
      } else {
        x.active = false;
      }
      return x;
    });
    setTabState(tab);
    setContentState(con);
  };

  return (
    <>
      <div className="card card-custom   zindex-2">
        <div className="card-header card-header-tabs-line">
          <div className="card-toolbar">
            <ul className="nav nav-tabs nav-bold nav-tabs-line">
              {tabState.map((tab) => (
                <li className="nav-item" key={tab.id}>
                  <span
                    onClick={() => setActiveTab(tab.id)}
                    className={cn([
                      "nav-link cursor-pointer",
                      tab.active && "active",
                    ])}
                    href={"#tab_" + tab.id}
                  >
                    {tab.icon && <span className="nav-icon">{tab.icon}</span>}
                    <span className="nav-text">{tab.title}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-toolbar">
            {buttons && buttons}
            {modal && (
              <button
                type="button"
                className="close ml-4"
                onClick={() => {
                  if (modalClose.question) {
                    swal({
                      title: "Pencereyi Kapatmak Üzeresiniz",
                      text: "Kapatmak İstediğinize Emin misiniz?",
                      buttons: ["İptal", "Evet, Kapat"],
                    }).then(function (result) {
                      console.log(result);
                      if (result) {
                        modalClose.set(false);
                      }
                    });
                  } else {
                    modalClose.set(false);
                  }
                }}
              >
                <i aria-hidden="true" className="ki ki-close" />
              </button>
            )}
          </div>
        </div>
        <div className="card-body">
          <div className="tab-content" style={{ minHeight: 250 }}>
            {contentState.map((item) => (
              <div
                key={item.id}
                className={cn(["tab-pane fade", item.active && "show active"])}
                id={"tab_" + item.id}
                role="tabpanel"
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
