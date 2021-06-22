import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Button, Input, SelectBox, Switch } from "../components/base";

import {
  setState,
  setAddressAdd,
  setUsersAdd,
  SelectCustomers,
} from "../features/customers/customerSlice";

import {
  setCountries,
  setProvinces,
  setDistricts,
  setNeighborhoods,
  setCountryId,
  setProvinceId,
  setDistrictId,
  setNeighborhoodId,
  setAddressState,
  SelectAddres,
} from "../features/customers/addreslice";

import { setUsersState, SelectUser } from "../features/customers/userSlice";
import {
  setCustomerPasswordState,
  SelectCustomerPassword,
} from "../features/customers/customerPasswordsSlice";

import {
  getCountries,
  getProvinces,
  getDistricts,
  getNeighborhoods,
} from "./parameters";

export const CustomersTabs = [
  {
    id: 1,
    icon: <i className="fas fa-home" />,
    title: "Genel Bilgiler",
  },
  {
    id: 2,
    icon: <i className="fas fa-map-marker-alt" />,
    title: "Adresler",
  },
  {
    id: 3,
    icon: <i className="fas fa-users" />,
    title: "Yetkililer",
  },

  {
    id: 4,
    icon: <i className="fas fa-lock" />,
    title: "Bilgiler",
  },
];

export const CustomersContents = () => {
  const customerDatas = useSelector(SelectCustomers);
  const addresDatas = useSelector(SelectAddres);
  const userDatas = useSelector(SelectUser);
  const passwordDatas = useSelector(SelectCustomerPassword);
  const dispatch = useDispatch();

  const [addresAreaToogle, setAdresAreaToggle] = useState(false);
  const [tmpAdresler, setTmpAdresler] = useState([]);
  const [tmpUsers, setTmpUsers] = useState([]);

  const passwordToggle = (key) => {
    const status = !passwordDatas[key];
    dispatch(setCustomerPasswordState({ key, value: status }));
  };

  useEffect(() => {
    getCountries().then((x) => dispatch(setCountries(x)));
    getProvinces(40).then((x) => dispatch(setProvinces(x)));
    getDistricts(1).then((x) => dispatch(setDistricts(x)));
    getNeighborhoods(1).then((x) => dispatch(setNeighborhoods(x)));
  }, []);

  const handleDistricChange = (id) => {
    getNeighborhoods(id).then((x) => dispatch(setNeighborhoods(x)));
  };

  const handleProvinceChange = (id) => {
    dispatch(setProvinceId(id));
    getDistricts(id).then((x) => {
      dispatch(setDistricts(x));
    });
  };

  const addToAddres = () => {
    const { Adresler } = customerDatas;
    const sort = Adresler.length + 1;
    dispatch(
      setAddressAdd({
        Ulke: addresDatas.tmpcountryText,
        Il: addresDatas.tmpprovinceText,
        Ilce: addresDatas.tmpdistrictText,
        Semt: addresDatas.tmpneighborhoodText,
        Baslik: addresDatas.addressTitle,
        Mahalle: addresDatas.neighborhoodText,
        Cadde: addresDatas.avenueText,
        Sokak: addresDatas.streetText,
        blokNo: addresDatas.blockNo,
        ApartmanNo: addresDatas.buildNo,
        DaireNo: addresDatas.apartNo,
        Kat: addresDatas.floor,
        Aciklama: addresDatas.note,
        Durum: addresDatas.status,
        Sira: sort,
      })
    );
    setTmpAdresler(customerDatas.Adresler);
  };

  const addToUsers = () => {
    dispatch(
      setUsersAdd({
        Ad: userDatas.Ad,
        Soyad: userDatas.Soyad,
        Mail: userDatas.Mail,
        Telefon: userDatas.Telefon,
        Durum: true,
      })
    );
    setTmpUsers(customerDatas.Kisiler);
  };

  return [
    {
      id: 1,
      content: (
        <>
          <div className="row">
            <Input
              parentClass="col-md-3"
              type="text"
              placeholder="Ünvan"
              label="Ünvan"
              value={customerDatas.Unvan}
              onChange={(e) =>
                dispatch(
                  setState({
                    key: "Unvan",
                    value: e.target.value,
                  })
                )
              }
            />

            <Input
              parentClass="col-md-3"
              type="text"
              placeholder="Vkn"
              label="Vkn"
              value={customerDatas.Vkn}
              onChange={(e) =>
                dispatch(
                  setState({
                    key: "Vkn",
                    value: e.target.value,
                  })
                )
              }
            />

            <SelectBox
              parentClass="col-md-3"
              label="Satış Temsilcisi"
              selected={customerDatas.SatisTemsilcisiId}
              options={[
                { value: "", name: "Şeçiniz" },
                { value: 1, name: "Tems 1" },
                { value: 2, name: "Tems 2" },
                { value: 3, name: "Tems 3" },
              ]}
              onChange={(e) => {
                dispatch(
                  setState({
                    key: "SatisTemsilcisiId",
                    value: e.value,
                  })
                );
              }}
            />

            <SelectBox
              parentClass="col-md-3"
              label="Müşteri Grubu"
              selected={customerDatas.MusteriGrubu}
              options={[
                { value: 1, name: "daneme" },
                { value: 2, name: "daneme2" },
              ]}
              onChange={(e) => {
                dispatch(
                  setState({
                    key: "MusteriGrubu",
                    value: e.value,
                  })
                );
              }}
            />
          </div>
          <div className="row">
            <SelectBox
              parentClass="col-md-3"
              label="Müşteri Tipi"
              selected={customerDatas.MusteriTipi}
              options={[
                { value: 1, name: "daneme" },
                { value: 2, name: "daneme2" },
              ]}
              onChange={(e) => {
                dispatch(
                  setState({
                    key: "MusteriTipi",
                    value: e.value,
                  })
                );
              }}
            />

            <Input
              parentClass="col-md-3"
              type="text"
              placeholder="Müşteri No"
              label="Müşteri No"
              onChange={(e) => {
                dispatch(
                  setState({
                    key: "MusteriNo",
                    value: e.value,
                  })
                );
              }}
            />

            <SelectBox
              parentClass="col-md-3"
              label="Ziyaret Sıklığı"
              selected={customerDatas.ZiyaretSikligi}
              options={[
                { value: 1, name: "daneme" },
                { value: 2, name: "daneme2" },
              ]}
              onChange={(e) => {
                dispatch(
                  setState({
                    key: "ZiyaretSikligi",
                    value: e.value,
                  })
                );
              }}
            />

            <SelectBox
              parentClass="col-md-3"
              label="Vergi Dairesi"
              selected={customerDatas.VergiDaire}
              options={[
                { value: 1, name: "daneme" },
                { value: 2, name: "daneme2" },
              ]}
              onChange={(e) => {
                dispatch(
                  setState({
                    key: "VergiDaire",
                    value: e.value,
                  })
                );
              }}
            />
          </div>
          <div className="row">
            <Input
              parentClass="col-md-4"
              type="text"
              placeholder="Mail"
              label="Mail"
              onChange={(e) => {
                dispatch(
                  setState({
                    key: "Mail",
                    value: e.value,
                  })
                );
              }}
            />
            <Input
              parentClass="col-md-4"
              type="text"
              placeholder="Telefon"
              label="Telefon"
              onChange={(e) => {
                dispatch(
                  setState({
                    key: "Telefon",
                    value: e.value,
                  })
                );
              }}
            />
            <Input
              parentClass="col-md-4"
              type="text"
              placeholder="Faks"
              label="Faks"
              onChange={(e) => {
                dispatch(
                  setState({
                    key: "Faks",
                    value: e.value,
                  })
                );
              }}
            />
          </div>
          <div className="row">
            <Input
              parentClass="col-md-6"
              type="textarea"
              placeholder="Adres"
              label="Adres"
              onChange={(e) => {
                dispatch(
                  setState({
                    key: "Adres",
                    value: e.value,
                  })
                );
              }}
            />
            <Input
              parentClass="col-md-6"
              type="textarea"
              placeholder="Açıklama"
              label="Açıklama"
              onChange={(e) => {
                dispatch(
                  setState({
                    key: "Aciklama",
                    value: e.value,
                  })
                );
              }}
            />
          </div>
        </>
      ),
    },
    {
      id: 2,
      content: (
        <>
          <div className="row">
            <div className="col-md-8 mx-auto bg-light border rounded p-2">
              <ul className="address-list">
                {tmpAdresler.length > 0 ? (
                  tmpAdresler
                    .slice()
                    .sort((a, b) => (a.Sira > b.Sira ? 1 : -1))
                    .map((adres) => (
                      <li key={adres.Sira}>
                        <b>{adres.Sira}-)</b> {adres.Baslik} |
                        {" " + adres.Il + " " + adres.Ilce + " " + adres.Semt}
                      </li>
                    ))
                ) : (
                  <div className="p-2 border rounded shadow mb-6 text-center text-black-50">
                    <h1>Adres Yok</h1>
                  </div>
                )}{" "}
              </ul>

              <div className="text-center">
                <Button
                  type="secondary"
                  text="Yeni Adres Ekle"
                  icon={<i className="fas fa-plus" />}
                  onClick={() => setAdresAreaToggle(true)}
                />
              </div>
            </div>
          </div>

          <br />

          <div
            className="bg-light p-3 border position-relative pt-6"
            style={{ display: addresAreaToogle ? "block" : "none" }}
          >
            <button
              className="toogleCloseBtn btn btn-sm btn-icon btn-outline-primary btn-circle mr-2"
              onClick={() => setAdresAreaToggle(false)}
            >
              <i className="fas fa-times" />
            </button>
            <div className="row">
              <SelectBox
                parentClass="col-md-3"
                label="Ülke"
                options={addresDatas.countries}
                selected={addresDatas.countryId}
                onChange={(e) => {
                  dispatch(setCountryId(e.value));
                  dispatch(
                    setAddressState({ key: "tmpcountryText", value: e.name })
                  );
                }}
              />

              <SelectBox
                parentClass="col-md-3"
                label="İl"
                options={addresDatas.provinces}
                onChange={(e) => {
                  handleProvinceChange(e.value);
                  dispatch(
                    setAddressState({ key: "tmpprovinceText", value: e.name })
                  );
                }}
                selected={addresDatas.provinceId}
              />

              <SelectBox
                parentClass="col-md-3"
                label="İlçe"
                options={addresDatas.districts}
                onChange={(e) => {
                  handleDistricChange(e.value);
                  dispatch(
                    setAddressState({ key: "tmpdistrictText", value: e.name })
                  );
                }}
                selected={addresDatas.districtId}
              />

              <SelectBox
                parentClass="col-md-3"
                label="Semt"
                options={addresDatas.neighborhoods}
                onChange={(e) => {
                  setNeighborhoodId(e.value);
                  dispatch(
                    setAddressState({
                      key: "tmpneighborhoodText",
                      value: e.name,
                    })
                  );
                }}
                selected={addresDatas.neighborhoodId}
              />
            </div>
            <div className="row">
              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Adres Başlığı"
                label="Adres Başlığı"
                value={addresDatas.addressTitle}
                onChange={(e) =>
                  dispatch(
                    setAddressState({
                      key: "addressTitle",
                      value: e.target.value,
                    })
                  )
                }
              />

              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Mahalle"
                label="Mahalle"
                value={addresDatas.neighborhoodText}
                onChange={(e) =>
                  dispatch(
                    setAddressState({
                      key: "neighborhoodText",
                      value: e.target.value,
                    })
                  )
                }
              />

              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Cadde"
                label="Cadde"
                value={addresDatas.avenueText}
                onChange={(e) =>
                  dispatch(
                    setAddressState({
                      key: "avenueText",
                      value: e.target.value,
                    })
                  )
                }
              />

              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Sokak"
                label="Sokak"
                value={addresDatas.streetText}
                onChange={(e) =>
                  dispatch(
                    setAddressState({
                      key: "streetText",
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div className="row">
              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Blok No"
                label="Blok No"
                value={addresDatas.blockNo}
                onChange={(e) =>
                  dispatch(
                    setAddressState({
                      key: "blockNo",
                      value: e.target.value,
                    })
                  )
                }
              />

              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Bina No"
                label="Bina No"
                value={addresDatas.buildNo}
                onChange={(e) =>
                  dispatch(
                    setAddressState({
                      key: "buildNo",
                      value: e.target.value,
                    })
                  )
                }
              />

              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Daire No"
                label="Daire No"
                value={addresDatas.apartNo}
                onChange={(e) =>
                  dispatch(
                    setAddressState({
                      key: "apartNo",
                      value: e.target.value,
                    })
                  )
                }
              />

              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Kat"
                label="Kat"
                value={addresDatas.floor}
                onChange={(e) =>
                  dispatch(
                    setAddressState({
                      key: "floor",
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div className="row">
              <Input
                parentClass="col-md-9"
                type="text"
                placeholder="Not"
                label="Not"
                value={addresDatas.note}
                onChange={(e) =>
                  dispatch(
                    setAddressState({
                      key: "note",
                      value: e.target.value,
                    })
                  )
                }
              />

              <Switch
                parentClass="col-md-3"
                label="Adres Durumu"
                checked={addresDatas.status}
                onChange={(e) =>
                  dispatch(
                    setAddressState({
                      key: "status",
                      value: e.target.checked,
                    })
                  )
                }
              />
            </div>
            <div className="text-center">
              <Button
                text="Adresi Kaydet"
                icon={<i className="fas fa-save" />}
                onClick={() => addToAddres()}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      id: 3,
      content: (
        <>
          <div className="row">
            <Input
              placeholder="Ad"
              label="Ad"
              parentClass="col"
              value={userDatas.Ad}
              onChange={(e) =>
                dispatch(setUsersState({ key: "Ad", value: e.target.value }))
              }
            />
            <Input
              placeholder="Soyad"
              label="Soyad"
              parentClass="col "
              value={userDatas.Soyad}
              onChange={(e) =>
                dispatch(setUsersState({ key: "Soyad", value: e.target.value }))
              }
            />
            <Input
              placeholder="Telefon"
              label="Telefon"
              parentClass="col "
              value={userDatas.Telefon}
              onChange={(e) =>
                dispatch(
                  setUsersState({ key: "Telefon", value: e.target.value })
                )
              }
            />
            <Input
              placeholder="Mail"
              label="Mail"
              parentClass="col"
              value={userDatas.Mail}
              onChange={(e) =>
                dispatch(setUsersState({ key: "Mail", value: e.target.value }))
              }
            />
            <div className="pt-7">
              <Button
                type="success"
                text="Ekle"
                className="btn-sm"
                onClick={() => addToUsers()}
              />
            </div>
          </div>
          <hr />

          <ul className="users-list">
            {tmpUsers.length > 0 ? (
              tmpUsers.map((item) => (
                <li key={Math.floor(Math.random() * 9999)}>
                  {item.Ad} {item.Soyad} |{item.Telefon} - {item.Mail}
                </li>
              ))
            ) : (
              <>Kişi Yok</>
            )}
          </ul>
        </>
      ),
    },
    {
      id: 4,
      content: (
        <>
          <div className="row">
            <Input
              label="Bakım Anlaşması:"
              placeholder="Bakım Anlaşması :"
              parentClass="col-md-3"
              value={customerDatas.AnlasmaAdi}
              onChange={(e) =>
                dispatch(
                  setState({
                    key: "AnlasmaAdi",
                    value: e.target.value,
                  })
                )
              }
            />

            <Input
              label="Bakım Anlaşması Bitiş Tarihi:"
              placeholder="Bakım Anlaşması Bitiş Tarihi:"
              type="date"
              parentClass="col-md-3"
              value={customerDatas.AnlasmaBitis}
              onChange={(e) =>
                dispatch(
                  setState({
                    key: "AnlasmaBitis",
                    value: e.target.value,
                  })
                )
              }
            />
            <Input
              label="E-Mikro Mail"
              placeholder="E-Mikro Mail"
              parentClass="col-md-3"
              value={customerDatas.EMikroKullanici}
              onChange={(e) =>
                dispatch(
                  setState({
                    key: "EMikroKullanici",
                    value: e.target.value,
                  })
                )
              }
            />

            <div className=" col-md-3  " style={{ position: "relative" }}>
              <Input
                label="E-Mikro Şifre"
                placeholder="E-Mikro Şifre"
                type={passwordDatas.mikro ? "text" : "password"}
                childClass="pr-10"
                value={customerDatas.EMikroSifre}
                onChange={(e) =>
                  dispatch(
                    setState({
                      key: "EMikroSifre",
                      value: e.target.value,
                    })
                  )
                }
              />
              <Button
                className="btn-show-password"
                type="icon"
                onClick={() => passwordToggle("mikro")}
                icon={
                  passwordDatas.mikro ? (
                    <i className="fas fa-eye-slash" />
                  ) : (
                    <i className="fas fa-eye" />
                  )
                }
              />
            </div>
          </div>

          <div className="row">
            <div className=" col-md-3  " style={{ position: "relative" }}>
              <Input
                label="Srv Şifre"
                placeholder="Srv Şifre"
                type={passwordDatas.srv ? "text" : "password"}
                childClass="pr-10"
                value={customerDatas.SrvSifre}
                onChange={(e) =>
                  dispatch(
                    setState({
                      key: "SrvSifre",
                      value: e.target.value,
                    })
                  )
                }
              />
              <Button
                className="btn-show-password"
                type="icon"
                onClick={() => passwordToggle("srv")}
                icon={
                  passwordDatas.srv ? (
                    <i className="fas fa-eye-slash" />
                  ) : (
                    <i className="fas fa-eye" />
                  )
                }
              />
            </div>

            <Input
              label="Akis PIN"
              placeholder="Akis PIN"
              parentClass="col-md-3"
              value={customerDatas.AkisPin}
              onChange={(e) =>
                dispatch(
                  setState({
                    key: "AkisPin",
                    value: e.target.value,
                  })
                )
              }
            />
            <Input
              label="Sunucu Giriş"
              placeholder="Sunucu Giriş"
              parentClass="col-md-3"
              value={customerDatas.SunucuGiris}
              onChange={(e) =>
                dispatch(
                  setState({
                    key: "SunucuGiris",
                    value: e.target.value,
                  })
                )
              }
            />
            <div className=" col-md-3  " style={{ position: "relative" }}>
              <Input
                label="Sunucu Şifre"
                placeholder="Sunucu Şifre"
                type={passwordDatas.server ? "text" : "password"}
                childClass="pr-10"
                value={customerDatas.SunucuSifre}
                onChange={(e) =>
                  dispatch(
                    setState({
                      key: "SunucuSifre",
                      value: e.target.value,
                    })
                  )
                }
              />
              <Button
                className="btn-show-password"
                type="icon"
                onClick={() => passwordToggle("server")}
                icon={
                  passwordDatas.server ? (
                    <i className="fas fa-eye-slash" />
                  ) : (
                    <i className="fas fa-eye" />
                  )
                }
              />
            </div>
          </div>
        </>
      ),
    },
  ];
};
