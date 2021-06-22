import React, { useEffect, useState } from "react";
import { Button, FileUploader, Input, SelectBox } from "../base";
import moment from "moment";
import axios from "axios";

export default function ActiviteNormalForm({
  handleActiviteSave,
  selectedCustomerId = null,
}) {
  const [customersDatas, setCustomersDatas] = useState([
    { value: "", name: "Seçiniz" },
  ]);
  const [fileState, setFileState] = useState([]);
  const [saveDatas, setSaveDatas] = useState({
    Id: 0,
    ZiyaretId: 0,
    MusteriId: "",
    FaliyetTipiId: "",
    FaliyetTuruId: "",
    BaslamaTarihi: "",
    BitisTarihi: "",
    Aciklama: "",
  });

  const addFiles = (files) => {
    const tmp = [...fileState, ...files];
    setFileState(tmp);
  };

  const stateChange = (key, value) => {
    const tmp = saveDatas;
    tmp[key] = value;
    setSaveDatas(tmp);
  };

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + "Musteri/MusterilerFilter";
    axios.get(url).then((response) => {
      const { data } = response;
      console.log(data);
      if (data.SonucTipi === 1) {
        const datas = [{ value: "", name: "Seçiniz" }, ...data.Veri];
        setCustomersDatas(datas);
      }
    });
  }, []);

  return (
    <>
      <div className="row">
        <SelectBox
          parentClass="col-md-12"
          label="Müşteri"
          selected={selectedCustomerId ? selectedCustomerId : ""}
          options={customersDatas}
          onChange={(e) => stateChange("MusteriId", e.value ? e.value : "")}
        />
      </div>

      <div className="row">
        <Input
          type="datetime-local"
          label="Başlama Tarihi - Saati"
          parentClass="col-md-12"
          value={moment().format("YYYY-MM-DDTHH:mm")}
          onChange={(e) => stateChange("BaslamaTarihi", e.target.value)}
        />
      </div>

      <div className="row">
        <Input
          type="datetime-local"
          label="Bitiş Tarihi - Saati"
          parentClass="col-md-12"
          value={moment().format("YYYY-MM-DDTHH:mm")}
          onChange={(e) => stateChange("BitisTarihi", e.target.value)}
        />
      </div>

      <div className="row">
        <SelectBox
          parentClass="col-md-6"
          label="Faaliyet Tipi"
          selected={""}
          options={[
            { value: "", name: "Şeçiniz" },
            { value: 1, name: "Tip 1" },
            { value: 2, name: "Tip 2" },
            { value: 3, name: "Tip 3" },
          ]}
          onChange={(e) => stateChange("FaliyetTipiId", e.value)}
        />

        <SelectBox
          parentClass="col-md-6"
          label="Faaliyet Türü"
          selected={""}
          options={[
            { value: "", name: "Şeçiniz" },
            { value: 1, name: "Tür 1" },
            { value: 2, name: "Tür 2" },
            { value: 3, name: "Tür 3" },
          ]}
          onChange={(e) => stateChange("FaliyetTuruId", e.value)}
        />
      </div>

      <div className="row">
        <Input
          type="textarea"
          label="Açıklama"
          placeholder="Açıklama"
          parentClass="col-md-12"
          onChange={(e) => stateChange("Aciklama", e.target.value)}
        />
      </div>

      <FileUploader onChange={(files) => addFiles(files)} />
      <ul>
        {fileState.map((file) => (
          <li key={file.lastModified}>{file.name}</li>
        ))}
      </ul>

      <div className="row">
        <div className="col-md-12 text-center">
          <Button
            text="Kaydet"
            icon={<i className="fas fa-save" />}
            onClick={() => handleActiviteSave(saveDatas, fileState)}
          />
        </div>
      </div>
    </>
  );
}
