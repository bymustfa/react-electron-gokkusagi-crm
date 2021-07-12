import React from "react";
import { Input, SelectBox, Button } from "../base";
import { DiscountInput } from "./index";

export default function LineDetails(props) {
  return (
    <>
      <div className="row">
        <SelectBox
          label="Sorumluluk Merkezi"
          parentClass="col-md-6"
          options={[{ value: "", name: "Seçiniz" }]}
          onChange={(e) => {}}
        />

        <SelectBox
          label="Proje Kodu"
          parentClass="col-md-6"
          options={[{ value: "", name: "Seçiniz" }]}
          onChange={(e) => {}}
        />
      </div>

      <div className="row">
        <SelectBox
          label="Depo"
          parentClass="col-md-6"
          options={[{ value: "", name: "Seçiniz" }]}
          onChange={(e) => {}}
        />

        <SelectBox
          label="Kdv"
          parentClass="col-md-6"
          options={[{ value: "", name: "Seçiniz" }]}
          onChange={(e) => {}}
        />
      </div>

      <div className="row">
        <Input
          label="Miktar"
          placeholder="Miktar"
          parentClass="col-md-6"
          type="number"
          min={1}
          step={0.01}
        />

        <Input
          label="Birim Fiyat"
          placeholder="Birim Fiyat"
          parentClass="col-md-6"
          type="number"
          min={1}
          step={0.01}
          value={0}
        />
      </div>

      <div className="row">
        <Input
          label="Satır Açıklaması"
          placeholder="Satır Açıklaması"
          parentClass="col-md-12"
          type="textarea"
          rows={3}
        />
      </div>

      <div className="row">
        <div className="col-md-12">
          <h3>İskonto</h3>
        </div>
      </div>
      {[1, 2, 3, 4, 5].map((loop) => {
        return (
          <DiscountInput
            order={loop}
            key={loop}
            changeType={(type, order) => console.log(type, order)}
          />
        );
      })}
      <hr className="my-5" />
      <div className="text-center  ">
        <Button text="Kaydet" />
      </div>
    </>
  );
}
