import React, { useState, useEffect } from "react";
import { Input, SelectBox, Button } from "../components/base";
import { Layout, StockSearchInput, LineDetails } from "../components/partials";
import { formatMoney } from "../app/helpers";
import { useToasts } from "react-toast-notifications";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { getCustomers, getCustomerAddress } from "./parameters";
import { useDispatch, useSelector } from "react-redux";

import {
  setOfferState,
  setLinesAdd,
  setLinesDelete,
  setLinesChange,
  setDescriptionDelete,
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
  const [currency, setCurrency] = useState("TL");

  const [customers, setCustomer] = useState([]);
  const [customerAddress, setCustomerAddress] = useState([]);
  const [stockSearchText, setStockSearchText] = useState("");
  const [lines, setLines] = useState([]);
  const [lineDetailModalOpen, setLineDetailModalOpen] = useState(false);
  const [lineModalDatas, setLineModalDatas] = useState({});

  const [descInput, setDescInput] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [linesFooter, setLinesFooter] = useState({
    AraTutar: 0,
    ToplamIskonto: 0,
    IskontoSonrasiTutar: 0,
    KdvTutar: 0,
    GenelTutar: 0,
  });

  useEffect(() => {
    getCustomers().then((x) => setCustomer([...x]));
  }, []);

  useEffect(() => {
    setLines(offerDatas.Satirlar);
    console.log("Redux Satılar Değişti: ", offerDatas.Satirlar);
  }, [offerDatas.Satirlar]);

  useEffect(() => {
    setDescriptions(offerDatas.Aciklamalar);
  }, [offerDatas.Aciklamalar]);

  const stockCalc = () => {
    const toplam = parseFloat(
      (stockInfos.Miktar * stockInfos.BirimFiyat).toFixed(2)
    );

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

  const descriptionDelete = (key) => dispatch(setDescriptionDelete(key));

  const addToDescription = () => {
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

  const offerSetData = (key, value) => dispatch(setOfferState({ key, value }));

  const getAdress = (customerId) =>
    customerId &&
    getCustomerAddress(customerId).then((x) => setCustomerAddress([...x]));

  const lineChangeSave = (datas = null) => {
    let tmpLines = offerDatas.Satirlar.map((line) =>
      datas && line.Sira === datas.Sira ? { ...datas } : { ...line }
    );
    console.log("tmpLines: ", tmpLines);
    let araTutar = 0;
    let kdvTutar = 0;
    let genelTutar = 0;

    let toplamIsnkontoDoviz = 0;
    let toplamIsnkontoYuzde = 0;

    let yuzdeIcınBirimFiyat = 0;

    tmpLines = tmpLines.map((satir) => {
      yuzdeIcınBirimFiyat += satir.BirimFiyat * satir.Miktar;
      if (satir.Iskonto.length > 0) {
        let toplam = satir.BirimFiyat * satir.Miktar;
        satir.Iskonto.map((iskonto) => {
          if (iskonto.Tip === "doviz") {
            satir.Toplam = satir.BirimFiyat * satir.Miktar - iskonto.Iskonto;
            toplamIsnkontoDoviz += iskonto.Iskonto;
            toplamIsnkontoYuzde +=
              (iskonto.Iskonto / (satir.BirimFiyat * satir.Miktar)) * 100;
          } else {
            let yuzdeHesap = (toplam / 100) * iskonto.Iskonto;
            toplamIsnkontoYuzde += iskonto.Iskonto;
            toplam -= yuzdeHesap;
            toplamIsnkontoDoviz += yuzdeHesap;
            satir.Toplam = toplam;
          }
        });
      }

      araTutar += satir.Toplam;
      kdvTutar += (satir.Toplam * satir.Kdv) / 100;

      return satir;
    });

    let yuzdeOran = 0;

    if (yuzdeIcınBirimFiyat != araTutar) {
      yuzdeOran =
        ((yuzdeIcınBirimFiyat - araTutar) / yuzdeIcınBirimFiyat) * 100;
    }

    genelTutar = araTutar + kdvTutar;
    setLines(tmpLines);

    let tmpFooterLines = linesFooter;

    tmpFooterLines.AraTutar = formatMoney(araTutar) + " " + currency;
    tmpFooterLines.ToplamIskonto = `${formatMoney(
      toplamIsnkontoDoviz
    )} ${currency} | %  ${formatMoney(yuzdeOran)}`;
    tmpFooterLines.IskontoSonrasiTutar = formatMoney(araTutar) + " " + currency;
    tmpFooterLines.KdvTutar = formatMoney(kdvTutar) + " " + currency;
    tmpFooterLines.GenelTutar = formatMoney(genelTutar) + " " + currency;

    setLinesFooter(tmpFooterLines);

    setLineDetailModalOpen(false);

    // dispatch(setLinesChange(tmpLines));
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
      setTotal(0);
      lineChangeSave();
    }
  };

  const lineDelete = (key) => {
    dispatch(setLinesDelete(key));
    lineChangeSave();
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
              options={[]}
              selected={offerDatas.TeslimTipiId}
              onChange={(e) =>
                offerSetData("TeslimTipiId", e?.value ? e.value : "")
              }
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
                offerSetData("MusteriId", e?.value ? e.value : "");
                e?.value && getAdress(e.value);
              }}
            />

            <SelectBox
              parentClass="col-md-4"
              label="Müşteri Adresi"
              placeholder="Seçiniz"
              options={customerAddress}
              selected={offerDatas.MusteriAdresId}
              onChange={(e) =>
                e?.value &&
                offerSetData("MusteriAdresId", e?.value ? e.value : "")
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
              onChange={(e) =>
                offerSetData("SiparisDurumId", e?.value ? e.value : "")
              }
            />
          </div>

          <div className="row">
            <SelectBox
              parentClass="col-md-4"
              label="Sorumluluk Merkezi"
              placeholder="Seçiniz"
              options={[]}
              selected={offerDatas.SorumlulukMerkeziId}
              onChange={(e) =>
                offerSetData("SorumlulukMerkeziId", e?.value ? e.value : "")
              }
            />

            <SelectBox
              parentClass="col-md-4"
              label="Proje Kodu"
              placeholder="Seçiniz"
              options={[]}
              selected={offerDatas.ProjeId}
              onChange={(e) => offerSetData("ProjeId", e?.value ? e.value : "")}
            />

            <SelectBox
              parentClass="col-md-4"
              label="Depo"
              placeholder="Seçiniz"
              options={[]}
              selected={offerDatas.DepoId}
              onChange={(e) => offerSetData("DepoId", e?.value ? e.value : "")}
            />
          </div>

          <div className="row">
            <SelectBox
              parentClass="col-md-4"
              label="Para Birimi"
              placeholder="Seçiniz"
              options={[]}
              selected={offerDatas.ParaBirimiId}
              onChange={(e) =>
                offerSetData("ParaBirimiId", e?.value ? e.value : "")
              }
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
              options={[]}
              selected={offerDatas.SaticiId}
              onChange={(e) =>
                offerSetData("SaticiId", e?.value ? e.value : "")
              }
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
              onKeyPress={(e) =>
                e.code === "Enter" ||
                (e.code === "NumpadEnter" && addToListStock())
              }
            />

            <Input
              disabled
              label="Toplam"
              placeholder="Toplam"
              type="text"
              parentClass="col-md-2"
              value={formatMoney(total)}
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
              {lines
                .slice()
                .sort((a, b) => {
                  if (a.Sira > b.Sira) return 1;
                  if (a.Sira < b.Sira) return -1;
                  return 0;
                })
                .map((item) => (
                  <tr key={item.Sira}>
                    <td>{item.Sira}</td>
                    <td>{item.Kod}</td>
                    <td>{item.Ad}</td>
                    <td className="text-right">
                      {formatMoney(item.BirimFiyat)}
                    </td>
                    <td className="text-right">{item.Miktar}</td>
                    <td className="text-right">{formatMoney(item.Toplam)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-text-dark-50 btn-icon-primary btn-hover-icon-danger font-weight-bold btn-hover-bg-light mr-3"
                        onClick={() => {
                          setLineModalDatas(item);
                          setLineDetailModalOpen(true);
                        }}
                      >
                        <i className="flaticon2-edit text-sm"></i> Detay
                      </button>

                      <button
                        className="btn btn-sm btn-text-dark-50 btn-icon-primary btn-hover-icon-danger font-weight-bold btn-hover-bg-light mr-3"
                        onClick={() => {
                          Swal.fire({
                            title: "Satırı Silmek Üzeresiniz!",
                            text: "Silmek İstediğinize Emin misiniz?",
                            buttonsStyling: false,
                            reverseButtons: true,
                            confirmButtonText: " Evet, Sil!",
                            showCancelButton: true,
                            cancelButtonText: " Hayır, İptal",
                            customClass: {
                              confirmButton: "btn btn-danger",
                              cancelButton: "btn btn-default",
                            },
                          }).then(function (result) {
                            if (result.isConfirmed) {
                              lineDelete(item.Sira);
                            }
                          });
                        }}
                      >
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
                  <b>{linesFooter.AraTutar}</b>
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
                  <b>{linesFooter.ToplamIskonto}</b>
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
                  <b>{linesFooter.IskontoSonrasiTutar}</b>
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
                  <b>{linesFooter.KdvTutar}</b>
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
                  <b>{linesFooter.GenelTutar}</b>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <Modal centered show={lineDetailModalOpen}>
            <Modal.Header>
              <Modal.Title>Detay</Modal.Title>
              <button
                type="button"
                className="close ml-4"
                onClick={() => setLineDetailModalOpen(false)}
              >
                <i aria-hidden="true" className="ki ki-close" />
              </button>
            </Modal.Header>
            <Modal.Body>
              <LineDetails
                lineDatas={lineModalDatas}
                setLineDetails={(e) => console.log(e)}
                saveDatas={lineChangeSave}
              />
            </Modal.Body>
          </Modal>
        </>
      ),
    },
    {
      id: 3,
      content: (
        <>
          {/* TODO: açıklama düzenleme yapılacak */}
          <div className="row">
            <Input
              label="Açıklama"
              placeholder="Açıklama"
              parentClass="col-md-10"
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
              onKeyPress={(e) =>
                e.code === "Enter" ||
                (e.code === "NumpadEnter" && addToDescription())
              }
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

                      <button
                        className="btn btn-sm btn-text-dark-50 btn-icon-primary btn-hover-icon-danger font-weight-bold btn-hover-bg-light mr-3"
                        onClick={() => {
                          Swal.fire({
                            title: "Açıklamayı Silmek Üzeresiniz!",
                            text: "Silmek İstediğinize Emin misiniz?",
                            buttonsStyling: false,
                            reverseButtons: true,
                            confirmButtonText: " Evet, Sil!",
                            showCancelButton: true,
                            cancelButtonText: " Hayır, İptal",
                            customClass: {
                              confirmButton: "btn btn-danger",
                              cancelButton: "btn btn-default",
                            },
                          }).then(
                            (result) =>
                              result.isConfirmed && descriptionDelete(item.Sira)
                          );
                        }}
                      >
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
