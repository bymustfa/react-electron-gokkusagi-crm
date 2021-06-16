import React, { useEffect, useState } from "react";
import { Button, Input, SelectBox, Switch } from "../components/base";
import { useSelector, useDispatch } from "react-redux";
import { setState, SelectCustomers } from "../features/customers/customerSlice";
import {
  setCountries,
  setProvinces,
  setDistricts,
  setNeighborhoods,
  setCountryId,
  setProvinceId,
  setDistrictId,
  setNeighborhoodId,
  SelectAddres,
} from "../features/addres/addreslice";

import axios from "axios";

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
];

export const CustomersContents = () => {
  const customerDatas = useSelector(SelectCustomers);
  const addresDatas = useSelector(SelectAddres);

  const dispatch = useDispatch();
  const [addresAreaToogle, setAdresAreaToggle] = useState(false);

  useEffect(() => {
    getCountries().then((x) => dispatch(setCountries(x)));
    getProvinces(40).then((x) => dispatch(setProvinces(x)));
    getDistricts(1).then((x) => dispatch(setDistricts(x)));
    getNeighborhoods(1).then((x) => dispatch(setNeighborhoods(x)));
  }, []);

  const handleDistricChange = (id) => {
    console.log("ilçe id: ", id);
  };

  const handleProvinceChange = (id) => {
    dispatch(setProvinceId(id));
    getDistricts(id).then((x) => {
      dispatch(setDistricts(x));
    });
  };

  console.log(addresDatas);

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
              onChange={(e) => {
                dispatch(
                  setState({
                    key: "SatisTemsilcisiId",
                    value: e.value,
                  })
                );
              }}
              selected={customerDatas.SatisTemsilcisiId}
              options={[
                { value: 1, name: "daneme" },
                { value: 2, name: "daneme2" },
              ]}
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
              {customerDatas.Adresler.length > 0 ? (
                customerDatas.Adresler.map((adres) => (
                  <h1>{JSON.stringify(adres)}</h1>
                ))
              ) : (
                <div className="p-2 border rounded shadow mb-6 text-center text-black-50">
                  <h1>Adres Yok</h1>
                </div>
              )}

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
                onChange={(e) => dispatch(setCountryId(e.value))}
                selected={addresDatas.countryId}
              />

              <SelectBox
                parentClass="col-md-3"
                label="İl"
                options={addresDatas.provinces}
                onChange={(x) => handleProvinceChange(x.value)}
                selected={addresDatas.provinceId}
              />

              <SelectBox
                parentClass="col-md-3"
                label="İlçe"
                options={addresDatas.districts}
                onChange={(x) => handleDistricChange(x.value)}
                selected={addresDatas.districtId}
              />

              <SelectBox
                parentClass="col-md-3"
                label="Semt"
                options={addresDatas.neighborhoods}
                onChange={(x) => setNeighborhoodId(x.value)}
                selected={addresDatas.neighborhoodId}
              />
            </div>
            <div className="row">
              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Adres Başlığı"
                label="Adres Başlığı"
              />

              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Mahalle"
                label="Mahalle"
              />

              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Cadde"
                label="Cadde"
              />

              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Sokak"
                label="Sokak"
              />
            </div>
            <div className="row">
              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Blok No"
                label="Blok No"
                onChange={(e) => console.log(e)}
              />

              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Bina No"
                label="Bina No"
                onChange={(e) => console.log(e)}
              />

              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Daire No"
                label="Daire No"
                onChange={(e) => console.log(e)}
              />

              <Input
                parentClass="col-md-3"
                type="text"
                placeholder="Kat"
                label="Kat"
                onChange={(e) => console.log(e)}
              />
            </div>
            <div className="row">
              <Input
                parentClass="col-md-9"
                type="text"
                placeholder="Not"
                label="Not"
                onChange={(e) => console.log(e)}
              />

              <Switch
                parentClass="col-md-3"
                label="Adres Durumu"
                onChange={(e) => {
                  console.log(e.target.checked);
                }}
              />
            </div>
            <div className="text-center">
              <Button
                text="Adresi Ekle"
                icon={<i className="fas fa-plus" />}
                onClick={() => console.log("Adresi Ekle")}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      id: 3,
      content: (
        <div>
          <h1> tab 3</h1>
        </div>
      ),
    },
  ];
};
