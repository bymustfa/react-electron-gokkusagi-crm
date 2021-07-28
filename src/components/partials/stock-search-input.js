import React, { useState } from "react";
import { getStocksFilter } from "../../utils/parameters";
import { useToasts } from "react-toast-notifications";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function StockSearchInput({
  onChange,
  stockSearchText,
  setStockSearchText,
}) {
  const { addToast } = useToasts();

  const [stockSearchLoading, setStockSearcLoading] = useState(false);
  const [stokcList, setStockList] = useState([]);
  const [listOpen, setListOpen] = useState(false);

  const ref = useDetectClickOutside({
    onTriggered: () => setListOpen(false),
  });

  const searchStocks = () => {
    if (!stockSearchLoading) {
      const word = stockSearchText.trim();
      if (word.length > 0) {
        setStockSearcLoading(true);
        getStocksFilter(stockSearchText).then((response) => {
          setStockSearcLoading(false);
          setStockList(response);
          setListOpen(true);
        });
      } else {
        addToast("Aramak için değer girin", {
          appearance: "info",
          autoDismiss: true,
        });
      }
    }
  };
  return (
    <>
      <div className="form-group col-md-4 stock-search">
        <label>Stok</label>
        <div className="input-group">
          <input
            disabled={stockSearchLoading}
            type="text"
            className="form-control"
            placeholder="Stok"
            value={stockSearchText}
            onChange={(e) => {
              setStockSearchText(e.target.value.trim());

              if (e.target.value.trim().length === 0) {
                setListOpen(false);
                setStockList([]);
              }
            }}
            onKeyPress={(e) =>
              e.code === "Enter" || (e.code === "NumpadEnter" && searchStocks())
            }
          />
          <div className="input-group-append">
            <span className="input-group-text p-0">
              <button
                className="btn btn-sm btn-icon btn-hover-icon-danger"
                disabled={stockSearchLoading}
                onClick={() => searchStocks()}
              >
                {stockSearchLoading ? (
                  <div className="spinner spinner-track spinner-sm spinner-primary mr-5" />
                ) : (
                  <i className="fas fa-search" />
                )}
              </button>
            </span>
          </div>
        </div>
        {listOpen && (
          <ul className="stock-list" ref={ref}>
            {stokcList.length > 0 ? (
              stokcList.map((stock) => (
                <li
                  key={stock.Id}
                  className="border-bottom"
                  onClick={() => {
                    setStockSearchText(
                      (stock.StokKodu ? stock.StokKodu + " - " : "") +
                        stock.StokAdi
                    );
                    onChange(stock);

                    setListOpen(false);
                    setStockList([]);
                  }}
                >
                  {stock.StokKodu ? stock.StokKodu + " - " : ""} {stock.StokAdi}
                </li>
              ))
            ) : (
              <li className="text-center no-data font-weight-bold">
                <i className="fas fa-times" /> Sonuç Yok
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
}
