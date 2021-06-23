import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/tr";
import { Button, SelectBox, Input } from "../base";
import { getCustomers, getUsers } from "../../utils/parameters";

export default function TaskNormalForm({ handleTaskSave }) {
  const [saveDatas, setSaveDatas] = useState({
    Id: 0,
    MusteriId: "",
    KullaniciId: "",
    PlanlananBaslangicTarihi: moment().format("YYYY-MM-DD"),
    PlanlananBitisTarihi: moment().format("YYYY-MM-DD"),
    Aciklama: "",
  });

  const [customersDatas, setCustomersDatas] = useState([
    { value: "", name: "Seçiniz" },
  ]);
  const [usersDatas, setUsersDatas] = useState([
    { value: "", name: "Seçiniz" },
  ]);

  useEffect(() => {
    getCustomers().then((data) => {
      const datas = [{ value: "", name: "Seçiniz" }, ...data];
      setCustomersDatas(datas);
    });

    getUsers().then((data) => {
      console.log(data);
      const datas = [{ value: "", name: "Seçiniz" }, ...data];
      setUsersDatas(datas);
    });
  }, []);

  const stateSet = (key, value) => {
    const tmp = saveDatas;
    tmp[key] = value;
    setSaveDatas(tmp);
  };

  return (
    <>
      <div className="row">
        <SelectBox
          placeholder="Kullanıcı"
          label="Kullanıcı"
          parentClass="col-md-6"
          selected={saveDatas.KullaniciId}
          options={usersDatas}
          onChange={(e) => stateSet("KullaniciId", e.value)}
        />

        <SelectBox
          placeholder="Müşteri"
          label="Müşteri"
          parentClass="col-md-6"
          selected={saveDatas.MusteriId}
          options={customersDatas}
          onChange={(e) => stateSet("MusteriId", e.value)}
        />
      </div>

      <div className="row">
        <Input
          label="Planlanan Başlangıç Tarihi"
          parentClass="col-md-6"
          type="date"
          value={saveDatas.PlanlananBaslangicTarihi}
          onChange={(e) => stateSet("PlanlananBaslangicTarihi", e.target.value)}
        />

        <Input
          label="Planlanan Bitiş Tarihi"
          parentClass="col-md-6"
          type="date"
          value={saveDatas.PlanlananBitisTarihi}
          onChange={(e) => stateSet("PlanlananBitisTarihi", e.target.value)}
        />
      </div>

      <div className="row">
        <Input
          parentClass="col-md-12"
          type="textarea"
          placeholder="Açıklama"
          label="Açıklama"
          value={saveDatas.Aciklama}
          onChange={(e) => stateSet("Aciklama", e.target.value)}
        />
      </div>

      <div className="text-center">
        <Button
          text="Kaydet"
          icon={<i className="fas fa-save" />}
          onClick={() => handleTaskSave(saveDatas)}
        />
      </div>
    </>
  );
}
