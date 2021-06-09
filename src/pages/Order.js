import React from "react";
import { Link } from "react-router-dom";

export default function Order(props) {
  console.log("Order Page Load");
  return (
    <div>
      <h1>Sipariş </h1>
      <Link to="/"> Anasayfa </Link>
    </div>
  );
}
