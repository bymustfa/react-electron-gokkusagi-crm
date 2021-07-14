import React, { useEffect, useState } from "react";
import { Input, SelectBox, Button } from "../base";
import { DiscountInput } from "./index";

export default function LineDetails({ lineDatas, setLineDetails }) {
  const [details, setDetails] = useState(lineDatas);

  const [sorumlulukMerkeziId, setSorumlulukMerkeziId] = useState(
    lineDatas.SorumlulukMerkeziId
  );
  const [projeId, setProjeId] = useState(lineDatas.ProjeId);
  const [depoId, setDepoId] = useState(lineDatas.DepoId);
  const [kdv, setKdv] = useState(lineDatas.Kdv);

  const [discounts, setDiscounts] = useState(
    lineDatas.Iskonto.length > 0
      ? lineDatas.Iskonto
      : [{ Tip: "doviz", Iskonto: 0, Sira: 1 }]
  );

  const detailSet = (key, value) => {
    let tmp = { ...details };
    tmp[key] = value;
    setDetails(tmp);
  };

  const addDiscount = () => {
    if (discounts.length < 5) {
      const tmp = [
        ...discounts,
        { Tip: "doviz", Iskonto: 0, Sira: discounts.length + 1 },
      ];
      setDiscounts(tmp);
    }
  };

  const updateDiscount = (values) => {
    const tmp = discounts.map((data) => {
      if (values.Sira === data.Sira) {
        data.Tip = values.Tip;
        data.Iskonto = values.Iskonto;
      }
      return data;
    });

    setDiscounts(tmp);
  };

  const deleteDiscount = (key) => {
    const tmp = discounts.filter((data) => data.Sira !== key);
    setDiscounts(tmp);
  };

  useEffect(() => detailSet("Iskonto", discounts), []);
  useEffect(() => detailSet("Iskonto", discounts), [discounts]);
  useEffect(() => {
    detailSet("SorumlulukMerkeziId", sorumlulukMerkeziId);
    detailSet("ProjeId", projeId);
    detailSet("DepoId", depoId);
    detailSet("Kdv", kdv);
  }, [sorumlulukMerkeziId, projeId, depoId, kdv]);

  const detailsSave = () => {
    console.log("Save Details: ", details);
  };

  console.log("details: ", details);
  console.log("kdv: ", kdv);
  return (
    <>
      <div className="row">
        <SelectBox
          label="Sorumluluk Merkezi"
          parentClass="col-md-6"
          options={[{ value: "", name: "Seçiniz" }]}
          selected={sorumlulukMerkeziId}
          onChange={(e) => setSorumlulukMerkeziId(e.value)}
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
          options={[
            { value: 0, name: 0 },
            { value: 1, name: 1 },
            { value: 8, name: 8 },
            { value: 18, name: 18 },
          ]}
          selected={kdv}
          onChange={(e) => setKdv(e.value)}
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
          value={details.Miktar}
          onChange={(e) => detailSet("Miktar", e.target.value)}
        />

        <Input
          label="Birim Fiyat"
          placeholder="Birim Fiyat"
          parentClass="col-md-6"
          type="number"
          min={1}
          step={0.01}
          value={details.BirimFiyat}
          onChange={(e) => detailSet("BirimFiyat", e.target.value)}
        />
      </div>

      <div className="row">
        <Input
          label="Satır Açıklaması"
          placeholder="Satır Açıklaması"
          parentClass="col-md-12"
          type="textarea"
          rows={3}
          // value={details.Aciklama}
          // onChange={(e) => detailSet("Aciklama", e.target.value)}
        />
      </div>

      <div className="row">
        <div className="col-md-12">
          <h3>İskonto</h3>
          <hr className="my-5" />
        </div>
      </div>

      {discounts.map((loop) => {
        return (
          <DiscountInput
            key={loop.Sira}
            datas={loop}
            onChange={(e) => updateDiscount(e)}
            deleteDiscount={deleteDiscount}
          />
        );
      })}

      {discounts.length < 5 && (
        <div className="text-center">
          <Button
            type="success"
            className="btn-sm"
            onClick={() => addDiscount()}
            text="Yeni İskonto Ekle"
          />
        </div>
      )}

      <br />
      <hr className="my-5" />
      <div className="text-center  ">
        <Button text="Kaydet" onClick={() => detailsSave()} />
      </div>
    </>
  );
}
