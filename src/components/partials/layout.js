import React from "react";
import { Header } from "./index";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="d-flex flex-column-fluid">
          <div className="container">
            <div className="card card-custom">{children}</div>
          </div>
        </div>
      </div>

      <div
        className="footer bg-white py-4 d-flex flex-lg-column"
        id="kt_footer"
      >
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="text-dark order-2 order-md-1">
            <span className="text-muted font-weight-bold mr-2">2021 ©</span>
            <span className="text-dark-75 text-hover-primary">V: 1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
