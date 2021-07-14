import React, { useEffect, useState } from "react";
import { Button, Input, SelectBox } from "../base";
import {
  getCustomers,
  getCustomerUsers,
  getUsers,
} from "../../utils/parameters";
import { activiteRequiredSet } from "../../utils/required";
import { useToasts } from "react-toast-notifications";

export default function ActiviteNormalForm() {
  const { addToast } = useToasts();
  const [customers, setCusomers] = useState([]);
  const [customerUser, setCustomerUers] = useState([]);
  const [activitesTypes, setActivitesTypes] = useState([]);
  const [users, setUsers] = useState([]);

  const [saveDatas, setSaveDatas] = useState({
    Id: 0,
    AktiviteTipi: "",
    Kullanicilar: [],
    MusteriId: "",
    MusteriKisiler: [],
    PlanlananBaslangicTarihi: "",
    PlanlananBitisTarihi: "",
    Konu: "",
    Aciklama: "",
  });

  useEffect(() => {
    getCustomers().then((datas) =>
      setCusomers([{ value: "", name: "Seçiniz" }, ...datas])
    );

    getUsers().then((datas) => setUsers([...datas]));

    setActivitesTypes([
      { value: "", name: "Seçiniz" },
      { value: 1, name: "Ziyaret" },
      { value: 2, name: "Toplantı" },
      { value: 3, name: "Görev" },
    ]);
  }, []);

  const customerSelect = (customerId) => {
    getCustomerUsers(customerId).then((users) => setCustomerUers(users));
    const tmp = { ...saveDatas };
    tmp["MusteriKisiler"] = [];
    tmp["MusteriId"] = customerId;
    setSaveDatas(tmp);
  };

  const datasSet = (key, value) => {
    const tmp = { ...saveDatas };
    tmp[key] = value;
    setSaveDatas(tmp);
  };

  const datasSave = () => {
    let saveStatus = true;
    let alertContent = "";
    activiteRequiredSet.map((req) => {
      if (String(saveDatas[req.key]).trim().length == 0) {
        alertContent += `<div>${req.empty}</div>`;
        saveStatus = false;
      }
    });

    if (saveStatus) {
      console.log(saveDatas);
    } else {
      addToast(alertContent, {
        appearance: "warning",
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      <div className="row">
        <SelectBox
          parentClass="col-md-6"
          label="Aktivite Tipi"
          selected={saveDatas.AktiviteTipi}
          options={activitesTypes}
          onChange={(e) => datasSet("AktiviteTipi", e?.value ? e.value : "")}
        />

        <SelectBox
          parentClass="col-md-6"
          label="Kullanıcılar"
          multi
          selected={saveDatas.Kullanici}
          options={users}
          onChange={(e) => {
            let us = e ? JSON.parse(e) : [];
            us = us.map((x) => parseInt(x.value));
            datasSet("Kullanicilar", us);
          }}
        />
      </div>

      <div className="row">
        <SelectBox
          parentClass="col-md-6"
          label="Müşteri"
          selected={saveDatas.Musteri}
          options={customers}
          onChange={(e) => e && e.value && customerSelect(e.value)}
        />

        <SelectBox
          parentClass="col-md-6"
          label="Müşteri Kişiler"
          options={customerUser}
          multi={true}
          selected={saveDatas.MusteriKisiler}
          onChange={(e) => {
            let us = e ? JSON.parse(e) : [];
            us = us.map((x) => parseInt(x.value));
            datasSet("MusteriKisiler", us);
          }}
        />
      </div>

      <div className="row">
        <Input
          parentClass="col-md-6"
          type="datetime-local"
          label="Planlanan Başlangıç Tarihi:"
          value={saveDatas.PlanlananBaslangicTarihi}
          onChange={(e) => datasSet("PlanlananBaslangicTarihi", e.target.value)}
        />

        <Input
          parentClass="col-md-6"
          type="datetime-local"
          label="Planlanan Bitiş Tarihi:"
          value={saveDatas.PlanlananBitisTarihi}
          onChange={(e) => datasSet("PlanlananBitisTarihi", e.target.value)}
        />
      </div>

      <div className="row">
        <Input
          parentClass="col-md-12"
          label="Konu"
          placeholder="Konu"
          value={saveDatas.Konu}
          onChange={(e) => datasSet("Konu", e.target.value)}
        />
      </div>

      <div className="row">
        <Input
          parentClass="col-md-12"
          label="Açıklama"
          placeholder="Açıklama"
          type="textarea"
          value={saveDatas.Aciklama}
          onChange={(e) => datasSet("Aciklama", e.target.value)}
        />
      </div>

      <div className="text-center">
        <Button
          text="Kaydet"
          icon={<i className="fas fa-save" />}
          onClick={() => datasSave()}
        />
      </div>
    </>
  );
}
