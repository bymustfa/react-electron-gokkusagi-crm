import React, { useState } from "react";
import { Input, Button, SelectBox } from "../base";
import { Modal } from "react-bootstrap";

export default function SpeedCustomerForm() {
  const [saveDatas, setSaveDatas] = useState({
    Unvan: "",
    SatisTemsilcisiId: "",
    MusteriGrubu: "",
    MusteriNo: "",
    Mail: "",
    Telefon: "",
  });

  const saveDataSet = (key, value) => {
    const tmp = saveDatas;
    saveDatas[key] = value;
    setSaveDatas(tmp);
  };

  const handleSave = () => console.log(saveDatas);

  return (
    <>
      <div className="row">
        <Input
          parentClass="col-md-6"
          label="Ünvan"
          placeholder="Ünvan"
          value={saveDatas.Unvan}
          onChange={(e) => saveDataSet("Unvan", e.target.value)}
        />

        <SelectBox
          parentClass="col-md-6"
          label="Satış Temsilcisi"
          placeholder="Satış Temsilcisi"
          selected={saveDatas.SatisTemsilcisiId}
          options={[
            { value: "", name: "Şeçiniz" },
            { value: 1, name: "Tems 1" },
            { value: 2, name: "Tems 2" },
            { value: 3, name: "Tems 3" },
          ]}
          onChange={(e) => saveDataSet("SatisTemsilcisiId", e.value)}
        />

        <SelectBox
          parentClass="col-md-6"
          label="Müşteri Grubu"
          placeholder="Müşteri Grubu"
          selected={saveDatas.MusteriGrubu}
          options={[
            { value: "", name: "Şeçiniz" },
            { value: 1, name: "Grub 1" },
            { value: 2, name: "Grub 2" },
            { value: 3, name: "Grub 3" },
          ]}
          onChange={(e) => saveDataSet("MusteriGrubu", e.value)}
        />

        <Input
          parentClass="col-md-6"
          label="Müşteri No"
          placeholder="Müşteri No"
          value={saveDatas.MusteriNo}
          onChange={(e) => saveDataSet("MusteriNo", e.target.value)}
        />

        <Input
          parentClass="col-md-6"
          label="Mail"
          placeholder="Mail"
          value={saveDatas.Mail}
          onChange={(e) => saveDataSet("Mail", e.target.value)}
        />

        <Input
          parentClass="col-md-6"
          label="Telefon"
          placeholder="Telefon"
          value={saveDatas.Telefon}
          onChange={(e) => saveDataSet("Telefon", e.target.value)}
        />
      </div>

      <div className="text-center">
        <Button
          text="Kaydet"
          icon={<i className="fas fa-save" />}
          onClick={() => handleSave()}
        />
      </div>
    </>
  );
}
