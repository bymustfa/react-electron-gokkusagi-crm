import React from "react";
import { Button } from "../components/base";

export default function Error404(props) {
  console.log(props);
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center flex-column"
    >
      <h1>404 | Sayfa Bulunamad─▒</h1>
      <Button
        text="Geri Git"
        className="btn-lg"
        icon={<i className="fas fa-arrow-left" />}
        onClick={() => props.history.push("/")}
      />
    </div>
  );
}
