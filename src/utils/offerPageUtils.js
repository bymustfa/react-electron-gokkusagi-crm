import React, { useState, useEffect } from "react";
import { Input, SelectBox, Button } from "../components/base";
import { Layout, StockSearchInput, LineDetails } from "../components/partials";
import { useToasts } from "react-toast-notifications";
import { Modal } from "react-bootstrap";

import { getCustomers, getCustomerAddress } from "./parameters";
import { useDispatch, useSelector } from "react-redux";

import {
  setOfferState,
  setLinesAdd,
  setDescriptionAdd,
  SelectOffers,
} from "../features/offers/offerSlice";

export const OffersTabs = [
  {
    id: 1,
    icon: <i className="fas fa-home" />,
    title: "Genel Bilgiler",
  },
  {
    id: 2,
    icon: <i className="fas fa-list" />,
    title: "Satır Bilgileri",
  },
  {
    id: 3,
    icon: <i className="fas fa-comment" />,
    title: "Açıklama",
  },
];

export const OfferContents = () => {
  const { addToast } = useToasts();
  const offerDatas = useSelector(SelectOffers);
  const dispatch = useDispatch();

  const [stockInfos, setStockOnfos] = useState({
    Sira: 0,
    StokId: 0,
    Kod: "",
    Ad: "",
    Birim: "",
    Kdv: 18,
    Miktar: 1,
    BirimFiyat: 0,
    Toplam: 0,
    SorumlulukMerkeziId: 0,
    ProjeId: 0,
    DepoId: 0,
    Aciklama: "",
    Iskonto: [],
  });
  const [total, setTotal] = useState(0);

  const [customers, setCustomer] = useState([]);
  const [customerAddress, setCustomerAddress] = useState([]);
  const [stockSearchText, setStockSearchText] = useState("");
  const [lines, setLines] = useState([]);

  const [descInput, setDescInput] = useState("");
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    getCustomers().then((x) =>
      setCustomer([{ value: "", name: "Seçiniz" }, ...x])
    );
  }, []);

  const stockCalc = () => {
    const toplam = stockInfos.Miktar * stockInfos.BirimFiyat;

    const tmp = stockInfos;
    tmp.Toplam = toplam;
    setStockOnfos({ ...tmp });
    setTotal(toplam);
  };

  const stockInfosSet = (key, value) => {
    const tmp = stockInfos;
    tmp[key] = value;
    setStockOnfos({ ...tmp });
    stockCalc();
  };

  const addToListStock = () => {
    if (stockInfos.StokId === 0) {
      addToast("Stok Seçiniz", {
        appearance: "info",
        autoDismiss: true,
      });
    } else {
      let sira = offerDatas.Satirlar.length + 1;
      const tmp = stockInfos;
      tmp.Sira = sira;
      dispatch(setLinesAdd(tmp));
      setStockSearchText("");
      setStockOnfos({
        Sira: 0,
        StokId: 0,
        Kod: "",
        Ad: "",
        Birim: "",
        Kdv: 18,
        Miktar: 1,
        BirimFiyat: 0,
        Toplam: 0,
        SorumlulukMerkeziId: 0,
        ProjeId: 0,
        DepoId: 0,
        Aciklama: "",
        Iskonto: [],
      });
    }
  };

  useEffect(() => {
    setLines(offerDatas.Satirlar);
  }, [offerDatas.Satirlar]);

  const addToDescription = () => {
    console.log(descInput);
    if (descInput.trim().length === 0) {
      addToast("Açıklama Giriniz", {
        appearance: "info",
        autoDismiss: true,
      });
    } else {
      let sira = offerDatas.Aciklamalar.length + 1;
      dispatch(setDescriptionAdd({ Aciklama: descInput, Sira: sira }));
      setDescInput("");
    }
  };

  useEffect(() => {
    setDescriptions(offerDatas.Aciklamalar);
  }, [offerDatas.Aciklamalar]);

  const offerSetData = (key, value) => {
    dispatch(setOfferState({ key, value }));
  };
  const getAdress = (customerId) => {
    if (customerId)
      getCustomerAddress(customerId).then((x) =>
        setCustomerAddress([{ value: "", name: "Seçiniz" }, ...x])
      );
  };

  return [
    {
      id: 1,
      content: (
        <>
          <div className="row">
            <Input
              parentClass="col-md-4"
              label="Seri"
              placeholder="Seri"
              disabled
            />
            <Input
              parentClass="col-md-4"
              label="Sıra"
              placeholder="Sıra"
              disabled
            />
            <SelectBox
              parentClass="col-md-4"
              label="Teslim Tipi"
              placeholder="Seçiniz"
              options={[{ value: "", name: "Seçiniz" }]}
              selected={offerDatas.TeslimTipiId}
              onChange={(e) => offerSetData("TeslimTipiId", e.value)}
            />
          </div>

          <div className="row">
            <SelectBox
              parentClass="col-md-4"
              label="Müşteri"
              placeholder="Seçiniz"
              options={customers}
              selected={offerDatas.MusteriId}
              onChange={(e) => {
                offerSetData("MusteriId", e.value);
                getAdress(e.value);
              }}
            />

            <SelectBox
              parentClass="col-md-4"
              label="Müşteri Adresi"
              placeholder="Seçiniz"
              options={customerAddress}
              selected={offerDatas.MusteriAdresId}
              onChange={(e) =>
                e?.value && offerSetData("MusteriAdresId", e.value)
              }
            />
            <SelectBox
              parentClass="col-md-4"
              placeholder="Seçiniz"
              label="Durum"
              options={[
                { value: "", name: "Seçiniz" },
                { value: 1, name: "Dur 1" },
              ]}
              selected={offerDatas.SiparisDurumId}
              onChange={(e) => offerSetData("SiparisDurumId", e.value)}
            />
          </div>

          <div className="row">
            <SelectBox
              parentClass="col-md-4"
              label="Sorumluluk Merkezi"
              placeholder="Seçiniz"
              options={[{ value: "", name: "Seçiniz" }]}
              selected={offerDatas.SorumlulukMerkeziId}
              onChange={(e) => offerSetData("SorumlulukMerkeziId", e.value)}
            />

            <SelectBox
              parentClass="col-md-4"
              label="Proje Kodu"
              placeholder="Seçiniz"
              options={[{ value: "", name: "Seçiniz" }]}
              selected={offerDatas.ProjeId}
              onChange={(e) => offerSetData("ProjeId", e.value)}
            />

            <SelectBox
              parentClass="col-md-4"
              label="Depo"
              placeholder="Seçiniz"
              options={[{ value: "", name: "Seçiniz" }]}
              selected={offerDatas.DepoId}
              onChange={(e) => offerSetData("DepoId", e.value)}
            />
          </div>

          <div className="row">
            <SelectBox
              parentClass="col-md-4"
              label="Para Birimi"
              placeholder="Seçiniz"
              options={[{ value: "", name: "Seçiniz" }]}
              selected={offerDatas.ParaBirimiId}
              onChange={(e) => offerSetData("ParaBirimiId", e.value)}
            />

            <Input
              parentClass="col-md-4"
              label="Kur"
              type="number"
              min={0}
              max={100}
              step={0.01}
              placeholder="Kur"
              value={offerDatas.Kur}
              onChange={(e) => offerSetData("Kur", e.target.value)}
            />

            <SelectBox
              parentClass="col-md-4"
              label="Satıcı"
              placeholder="Seçiniz"
              options={[{ value: "", name: "Seçiniz" }]}
              selected={offerDatas.SaticiId}
              onChange={(e) => offerSetData("SaticiId", e.value)}
            />
          </div>
          <div className="row">
            <Input
              parentClass="col-md-4"
              label="Teslim Tarihi"
              type="date"
              value={offerDatas.TeslimTarihi}
              onChange={(e) => offerSetData("TeslimTarihi", e.target.value)}
            />

            <Input
              parentClass="col-md-4"
              label="Tarih"
              type="date"
              value={offerDatas.Tarih}
              onChange={(e) => offerSetData("Tarih", e.target.value)}
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
            <StockSearchInput
              setStockSearchText={setStockSearchText}
              stockSearchText={stockSearchText}
              onChange={(e) => {
                stockInfosSet("StokId", e.Id);
                stockInfosSet("Kod", e.StokKodu);
                stockInfosSet("Ad", e.StokAdi);
                stockInfosSet("Birim", e.Birim);
                stockInfosSet("Kdv", e.Kdv);
                stockInfosSet("Miktar", 1);
                stockInfosSet("BirimFiyat", 0);
                stockInfosSet("SorumlulukMerkeziId", 0);
                stockInfosSet("ProjeId", 0);
                stockInfosSet("DepoId", 0);
              }}
            />
            <Input
              label="Miktar"
              placeholder="Mikar"
              type="number"
              parentClass="col-md-2"
              value={stockInfos.Miktar}
              onChange={(e) => {
                stockInfosSet("Miktar", parseFloat(e.target.value));
              }}
              min={0}
              max={1000}
              step={0.01}
            />

            <Input
              label="Birim Fiyat"
              placeholder="Birim Fiyat"
              type="number"
              parentClass="col-md-2"
              value={stockInfos.BirimFiyat}
              onChange={(e) => {
                stockInfosSet("BirimFiyat", parseFloat(e.target.value));
              }}
              min={0}
              max={1000}
              step={0.01}
            />

            <Input
              disabled
              label="Toplam"
              placeholder="Toplam"
              type="number"
              parentClass="col-md-2"
              value={total}
              min={0}
              max={1000}
              step={0.01}
            />

            <div className=" col-md-2 pt-8">
              <Button
                type="secondary"
                icon={<i className="fas fa-plus" />}
                text="Ekle"
                className="col-12"
                onClick={() => addToListStock()}
              />
            </div>
          </div>

          <hr />

          <table className="table table-striped table-bordered line-table">
            <thead>
              <tr>
                <th>Sıra</th>
                <th>Kod</th>
                <th>Stok</th>
                <th>Birim Fiyatı</th>
                <th>Miktar</th>
                <th>Toplam</th>
                <th style={{ width: 175 }}>İşlem</th>
              </tr>
            </thead>
            <tbody className="border border-2">
              {lines.map((item) => (
                <tr key={item.Sira}>
                  <td>{item.Sira}</td>
                  <td>{item.Kod}</td>
                  <td>{item.Ad}</td>
                  <td className="text-right">{item.BirimFiyat}</td>
                  <td className="text-right">{item.Miktar}</td>
                  <td className="text-right">{item.Toplam}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-text-dark-50 btn-icon-primary btn-hover-icon-danger font-weight-bold btn-hover-bg-light mr-3"
                      onClick={() => {
                        console.log(item.Sira);
                      }}
                    >
                      <i className="flaticon2-edit text-sm"></i> Detay
                    </button>

                    <button className="btn btn-sm btn-text-dark-50 btn-icon-primary btn-hover-icon-danger font-weight-bold btn-hover-bg-light mr-3">
                      <i className="flaticon2-trash text-sm"></i> Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-right">
                  <b>Ara Tutar:</b>
                </td>
                <td className="text-right">
                  <b>1</b>
                </td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-right">
                  <b>Toplam İskonto:</b>
                </td>
                <td className="text-right">
                  <b>1</b>
                </td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-right">
                  <b>İskonto Sonrası Tutar:</b>
                </td>
                <td className="text-right">
                  <b>1</b>
                </td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-right">
                  <b>KDV Tutar:</b>
                </td>
                <td className="text-right">
                  <b>1</b>
                </td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-right">
                  <b>Genel Tutar:</b>
                </td>
                <td className="text-right">
                  <b>1</b>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <Modal centered>
            <Modal.Header>
              <Modal.Title>Detay</Modal.Title>
              <button type="button" className="close ml-4" onClick={() => {}}>
                <i aria-hidden="true" className="ki ki-close" />
              </button>
            </Modal.Header>
            <Modal.Body>
              <LineDetails />
            </Modal.Body>
          </Modal>
        </>
      ),
    },
    {
      id: 3,
      content: (
        <>
          <div className="row">
            <Input
              label="Açıklama"
              placeholder="Açıklama"
              parentClass="col-md-10"
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
            />
            <div className=" col-md-2 pt-8">
              <Button
                text="Ekle"
                icon={<i className="fas fa-plus" />}
                type="secondary"
                className="col-12"
                onClick={() => addToDescription()}
              />
            </div>
          </div>
          <hr />

          <table className="table table-bordered table-striped table-sm line-table">
            <thead>
              <tr>
                <th style={{ width: 75 }}>Sıra</th>
                <th>Açıklama</th>
                <th style={{ width: 185 }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {descriptions
                .slice()
                .sort((a, b) => a.Sira - b.Sira)
                .map((item) => (
                  <tr key={item.Sira}>
                    <td>{item.Sira}</td>
                    <td>{item.Aciklama}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-text-dark-50 btn-icon-primary btn-hover-icon-danger font-weight-bold btn-hover-bg-light mr-3"
                        onClick={() => {
                          console.log(item.Sira);
                        }}
                      >
                        <i className="flaticon2-edit text-sm" /> Düzenle
                      </button>

                      <button className="btn btn-sm btn-text-dark-50 btn-icon-primary btn-hover-icon-danger font-weight-bold btn-hover-bg-light mr-3">
                        <i className="flaticon2-trash text-sm" /> Sil
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ),
    },
  ];
};
